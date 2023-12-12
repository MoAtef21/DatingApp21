using API.Data;
using API.Entites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

 [Authorize]
public class UserController : BaseApiController
{
    private readonly DataContext _context;

    public UserController(DataContext context)
    {
        _context = context;
    }
    [AllowAnonymous]
    [HttpGet]

    public async Task<ActionResult<IEnumerable<AppUser>>>GetUsers()
    {
        var users = await _context.Users.ToListAsync();
        return users;
    }

   [HttpGet("{Id}")]
    public async Task<ActionResult<AppUser>>GetUser(int Id)
    {
      return await _context.Users.FindAsync(Id);
    }
}
