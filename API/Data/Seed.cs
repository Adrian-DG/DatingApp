using Microsoft.EntityFrameworkCore;
using System.IO;
using Newtonsoft.Json;
using API.Entities;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context) {
            
            if ( await context.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json"); // read data as string
            var users = JsonConvert.DeserializeObject<List<AppUser>>(userData);  // turn json => AppUser Object 

            // This part encrypt the password 
            foreach( var user in users) 
            {

                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();

        }
    }
}