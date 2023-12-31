

using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationService (this IServiceCollection services,
        IConfiguration config)
        {
            services.AddDbContext<Data.DataContext>(opt =>
           {
             opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
           });
           services.AddCors();
           services.AddScoped<ITokenServices,TokenServices>();
           services.AddScoped<IUserRepository,UserRepository>();
           services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
           return services;
        }



    }
}