using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entites;
using API.Interfaces;
using API.Services;
using Azure.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

    public class AccountController : BaseApiController
  {
    private readonly DataContext _context;
    private readonly ITokenServices _tokenService;

    public AccountController(DataContext context,ITokenServices tokenService)
    {
        _tokenService = tokenService;
        _context = context;
    } 
    [HttpPost("register")]

    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
    if(await UserExists(registerDto.Username)) return BadRequest("User Name is taken");

    using var hmac = new HMACSHA512();

    var user = new AppUser
    {
        UserName = registerDto.Username.ToLower(),
        PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
        PasswordSalt = hmac.Key
    };

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

     return new UserDto
     {
      Username = user.UserName,
      Token = _tokenService.CreateToken(user)
     };
    }

     [HttpPost("Login")]
   public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
   {
    var user = await _context.Users.FirstOrDefaultAsync( x => x.UserName == loginDto.Username);
    
    if (user == null) return Unauthorized("Invaild User Name ya Sahby");
    
    using var hmac = new HMACSHA512(user.PasswordSalt);

    var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

    for(int i = 0; i < ComputeHash.Length;i++)
    {
        if(ComputeHash[i] != user.PasswordHash[i]) return Unauthorized("Invaild Password ya Ngm");
    }
    return new UserDto
     {
      Username = user.UserName,
      Token = _tokenService.CreateToken(user)
     };
    }
   
    private async Task<bool> UserExists(string UserName)
    {
     return await _context.Users.AnyAsync( x => x.UserName.ToLower() == UserName);    
    }
   }
 
