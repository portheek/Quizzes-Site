using Microsoft.EntityFrameworkCore;
using QuizAPI.Data.Entities;

namespace QuizAPI.Data
{
    public class QuizDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Question> Questions { get; set; }

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
