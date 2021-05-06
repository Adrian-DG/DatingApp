using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

using API.Interfaces;
using API.DTO;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using API.Extensions;
using API.Services;
using API.Entities;
using API.Data;

namespace API.Controllers
{

    [Authorize]
    public class UsersController : BaseController
    {
        private readonly IUserRepository _userRepository; 
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly DataContext _context;
        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService, DataContext context)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _photoService = photoService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{username}", Name="GetUser")]
        public async Task<ActionResult<MemberDTO>> GetUserByName(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO updateDTO) 
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            _mapper.Map(updateDTO, user);
            _userRepository.UpdateUserAsync(user);

            if(await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest();
        } 


        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDTO>> AddPhoto([FromForm] IFormFile file) 
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            var result = await _photoService.AddPhotoAsync(file);

            if(result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo();
            photo.Url = result.SecureUrl.AbsoluteUri;
            photo.PublicId = result.PublicId;
            photo.AppUser = user;
            photo.AppUserId = user.Id;  
                     
            _context.Photos.Add(photo);

            return await _userRepository.SaveAllAsync() 
                   ? CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDTO>(photo))
                   : BadRequest("Problem adding photo");        

        }


    }
}