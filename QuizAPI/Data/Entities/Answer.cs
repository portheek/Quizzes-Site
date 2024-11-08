namespace QuizAPI.Data.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public required string Question_Answer { get; set; }
        public required bool Is_Correct { get; set; }

        public int Questions_Id { get; set; }
    }
}
