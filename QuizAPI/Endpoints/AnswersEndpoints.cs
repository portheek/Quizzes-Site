using Microsoft.EntityFrameworkCore;
using QuizAPI.Data;
using QuizAPI.Data.Entities;

namespace QuizAPI.Endpoints
{
    public static class AnswersEndpoints
    {
        public static void MapAnswersEndpoints(this WebApplication app)
        {
            // Get all answers
            app.MapGet("/quizzes/{quizId}/questions/{questionId}/answers", async (QuizDbContext db, int quizId, int questionId) =>
            {
                var question = await db.Questions.FirstOrDefaultAsync(q => q.Id == questionId && q.Quiz_id == quizId);

                if (question == null)
                {
                    return Results.NotFound();
                }

                var answers = db.Answers.Where(a => a.Questions_Id == questionId).ToList();

                return Results.Ok(answers);
            })
            .WithName("GetAllAnswers")
            .WithDescription("Gets all answers from a question.")
            .Produces<Answer>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();

            // Get a specific answer
            app.MapGet("/quizzes/{quizId}/questions/{questionId}/answers/{answerId}", async (QuizDbContext db, int quizId, int questionId, int answerId) =>
            {
                var question = await db.Questions.FirstOrDefaultAsync(q => q.Id == questionId && q.Quiz_id == quizId);

                if (question == null)
                {
                    return Results.NotFound();
                }

                var answer = await db.Answers.FirstOrDefaultAsync(a => a.Questions_Id == questionId && a.Id == answerId);

                return Results.Ok(answer);
            })
            .WithName("GetAnswerById")
            .WithDescription("Gets a answer by ID.")
            .Produces<Answer>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();
            
            // Create an answer
            app.MapPost("/quizzes/{quizId}/questions/{questionId}/answers", async (QuizDbContext db, int quizId, int questionId, Answer a) =>
            {
                var quiz = await db.Quizzes.FirstOrDefaultAsync(q => q.Id == quizId);

                if (quiz == null)
                {
                    return Results.NotFound();
                }

                var Answer = new Answer
                {
                    Question_Answer = a.Question_Answer,
                    Is_Correct = a.Is_Correct,
                    Questions_Id = a.Questions_Id,
                };

                db.Answers.Add(Answer);
                await db.SaveChangesAsync();

                return Results.Created($"/quizzes/{quizId}/questions/{questionId}/answers/{Answer.Id}", Answer);
            })
            .WithName("CreateAnswerForQuestion")
            .WithDescription("Creates a new answer for a question.")
            .Produces<Question>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();

            // Update answer
            app.MapPut("/quizzes/{quizId}/questions/{questionId}/answers/{answerId}", async (QuizDbContext db, int quizId, int questionId, int answerId, Answer a) =>
            {
                var answer = await db.Answers.FirstOrDefaultAsync(a => a.Questions_Id == questionId && a.Id == answerId);

                if (answer == null)
                {
                    return Results.NotFound();
                }

                answer.Question_Answer = a.Question_Answer;
                answer.Is_Correct = a.Is_Correct;
                answer.Questions_Id = a.Questions_Id;
                await db.SaveChangesAsync();

                return Results.Ok(answer);
            })
            .WithName("UpdateAnswerForQuestion")
            .WithDescription("Updates a answer by ID for a question.")
            .Produces<Question>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();

            // Delete answer
            app.MapDelete("/quizzes/{quizId}/questions/{questionId}/answers/{answerId}", async (QuizDbContext db, int quizId, int questionId, int answerId) =>
            {
                var answer = await db.Answers.FirstOrDefaultAsync(a => a.Questions_Id == questionId && a.Id == answerId);

                if (answer == null)
                {
                    return Results.NotFound();
                }

                db.Answers.Remove(answer);
                await db.SaveChangesAsync();

                return Results.Ok();
            })
            .WithName("DeleteAnswer")
            .WithDescription("Deletes a answer by ID.")
            .Produces(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();
        }
    }
}
