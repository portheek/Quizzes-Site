namespace QuizAPI.Auth.Model
{
    public class QuizRoles
    {
        public const string Admin = nameof(Admin);
        public const string QuizUser = nameof(QuizUser);

        public static readonly IReadOnlyCollection<string> All = new[] { Admin, QuizUser };
    }
}
