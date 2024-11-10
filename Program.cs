using ChatDistribuido.Infra;

namespace ChatDistribuido
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSignalR();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .WithOrigins("http://localhost:4200")
                    .AllowCredentials());
            });

            var app = builder.Build();
                        
            app.UseRouting();

            /*app.UseCors(p =>
            {
                p.WithOrigins("http://localhost:4200")
                .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });*/

            app.UseCors("CorsPolicy");

            app.MapHub<Chat>("/chat");

            app.Run();
        }
    }
}
