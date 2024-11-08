using Microsoft.EntityFrameworkCore;
using QuizAPI.Data;
using QuizAPI.Data.Entities;

namespace QuizAPI.Endpoints
{
    public static class QuestionsEndpoints
    {
        public static void MapQuestionsEndpoints(this WebApplication app)
        {
            // Get all questions from a quic
            app.MapGet("/quizzes/{quizId}/questions", async (QuizDbContext db, int quizId) =>
            {
                var quiz = await db.Quizzes.FirstOrDefaultAsync(q  => q.Id == quizId);

                if(quiz == null)
                {
                    return Results.NotFound();
                }

                var questions = db.Questions.Where(q => q.Quiz_id == quizId).ToList();

                return Results.Ok(questions);
            })
            .WithName("GetAllQuestions")
            .WithDescription("Gets all questions from a quiz.")
            .Produces<Question>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();

            // Get a specific question from quiz
            app.MapGet("/quizzes/{quizId}/questions/{questionId}", async (QuizDbContext db, int quizId, int questionId) =>
            { 
                var question = db.Questions.FirstOrDefault(q => q.Id == questionId && q.Quiz_id == quizId);

                if (question == null)
                {
                    return Results.NotFound();
                }

                return Results.Ok(question);
            })
            .WithName("GetQuestionById")
            .WithDescription("Gets a question by ID.")
            .Produces<Question>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();
            
            // Create a question for a quiz
            app.MapPost("/quizzes/{quizId}/questions", async (QuizDbContext db, int quizId, Question q) =>
            {
                var quiz = await db.Quizzes.FirstOrDefaultAsync(q => q.Id == quizId);

                if (quiz == null)
                {
                    return Results.NotFound();
                }

                var question = new Question
                {
                    QuestionText = q.QuestionText,
                    Quiz_id = quizId,
                };

                db.Questions.Add(question);
                await db.SaveChangesAsync();

                return Results.Created($"/quizzes/{quiz.Id}/questions/{question.Id}", question);
            })
            .WithName("CreateQuestionForQuiz")
            .WithDescription("Creates a new question for a quiz.")
            .Produces<Question>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();

            // Update question
            app.MapPut("/quizzes/{quizId}/questions/{questionId}", async (QuizDbContext db, int quizId, int questionId, Question q) =>
            {
                var question = await db.Questions.FirstOrDefaultAsync(q => q.Id == questionId && q.Quiz_id == quizId);

                if (question == null)
                {
                    return Results.NotFound();
                }

                question.QuestionText = q.QuestionText;
                question.Quiz_id = q.Quiz_id;
                await db.SaveChangesAsync();

                return Results.Ok(question);
            })
            .WithName("UpdateQuestionForQuiz")
            .WithDescription("Updates a question by ID.")
            .Produces<Question>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();

            // Delete quiz
            app.MapDelete("/quizzes/{quizId}/questions/{questionId}", async (QuizDbContext db, int quizId, int questionId) =>
            {
                var question = await db.Questions.FirstOrDefaultAsync(q => q.Id == questionId && q.Quiz_id == quizId);

                if (question == null)
                {
                    return Results.NotFound();
                }

                db.Questions.Remove(question);
                await db.SaveChangesAsync();

                return Results.Ok();
            })
            .WithName("DeleteQuestion")
            .WithDescription("Deletes a question by ID.")
            .Produces(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();
        }
    }
}
