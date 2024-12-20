using Microsoft.AspNetCore.Http.HttpResults;
using QuizAPI.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace QuizAPI.Data.Entities
{
    public class Quiz
    {
        public  int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required DateTime Creation_Date { get; set; }

        [Required]
        public required string UserId { get; set; }
        public QuizUser User { get; set; }

    }
}
