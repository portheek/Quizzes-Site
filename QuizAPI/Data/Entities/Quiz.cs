using Microsoft.AspNetCore.Http.HttpResults;

namespace QuizAPI.Data.Entities
{
    public class Quiz
    {
        public  int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required DateTime Creation_Date { get; set; }

    }
}
