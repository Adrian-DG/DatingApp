using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) 
        {

        }

        
        /*
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<AppUser>()
            .HasData(
                new AppUser { Id = 1, UserName = "Adrian" },
                new AppUser { Id = 2, UserName = "victor" }
            );
        }
        */

        public DbSet<AppUser> Users {get; set;}
    }
}