using System;
using System.ComponentModel.DataAnnotations;
using API.Entities;
using System.Collections.Generic;

namespace API.DTO
{
    public class MemberDTO
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set;}
        public string KnowAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interest { get; set; }
        public string City { get; set; }
        public ICollection<PhotoDTO> Photos { get; set; } 
    }
}