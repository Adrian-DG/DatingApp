using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController: BaseController
    {
        private readonly DataContext _context;

        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            var request = _context.Users.Find(-1);
            if(request == null) return NotFound();
            return Ok(request);
        }

        [HttpGet("server-error")] 
        public ActionResult<string> GetServerError()
        {
            var request = _context.Users.Find(-1);
            return request.ToString();
        }

        
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return "This was a bad request";
        }



    }
}