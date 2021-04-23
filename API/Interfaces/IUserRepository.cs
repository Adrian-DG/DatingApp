using API.Entities;
using API.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void UpdateUser(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsername(string username);
        Task<IEnumerable<MemberDTO>> GetMembersAsync();
        Task<MemberDTO> GetMemberAsync(string username);
    }
}