using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using API.Interfaces;
using API.Services;
using API.Extensions;

using System.Text;

using API.Middlewares;

namespace API
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;

        }

        private string CustomPolicy = "_customPolicy";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Refers to ApplicationServicesExtensions class
            services.AddApplicationServices(Configuration);
            
            services.AddControllers();
            
            services.AddCors(options => options.AddPolicy(CustomPolicy, builder => {
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
                builder.WithOrigins("https://localhost:4200");
            }));

            // Refers to IdentityServiceExtensions class
            services.AddIdentityServices(Configuration);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }
                       

            //app.UseDeveloperExceptionPage();
           // app.UseMiddleware<ExceptionMiddleware>();
            

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(CustomPolicy);

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }


    }
}
