using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Auth.Model;
using QuizAPI.Data.Entities;

namespace QuizAPI.Data
{
    public class QuizDbContext : IdentityDbContext<QuizUser>
    {
        private readonly IConfiguration _configuration;
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Session> Sessions { get; set; }

        public QuizDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string conStr = _configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseMySql(conStr, new MySqlServerVersion(new Version(10, 4, 32)));
        }
    }
}
