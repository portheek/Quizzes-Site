using QuizAPI.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace QuizAPI.Data.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public required string QuestionText { get; set; }

        public int Quiz_id { get; set; }

    }
}
