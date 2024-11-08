using Microsoft.EntityFrameworkCore;
using QuizAPI.Data;
using QuizAPI.Data.Entities;

namespace QuizAPI.Endpoints
{
    public static class QuizEndpoints
    {
        public static void MapQuizEndpoints(this WebApplication app)
        {
            // Get all quizzes
            app.MapGet("/quizzes", async (QuizDbContext db) =>
            {
                var quizzes = await db.Quizzes
                                     .ToListAsync();
                return Results.Ok(quizzes);
            })
            .WithName("GetAllQuizzes")
            .WithDescription("Gets all quizzes.")
            .Produces<Quiz>(StatusCodes.Status200OK)
            .WithOpenApi();

            // Get a specific quiz
            app.MapGet("/quizzes/{quizId}", async (QuizDbContext db, int quizId) =>
            {
                var quiz = await db.Quizzes
                                    .FirstOrDefaultAsync(s => s.Id == quizId);

                if (quiz == null) return Results.NotFound();

                return Results.Ok(quiz);
            })
            .WithName("GetQuizById")
            .WithDescription("Gets a quiz by ID.")
            .Produces<Quiz>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();

            // Create quiz
            app.MapPost("/quizzes", async (QuizDbContext db, Quiz q) =>
            {

                Console.WriteLine(q.Id);
                Console.WriteLine(q.Title);
                Console.WriteLine(q.Description);

                var quiz = new Quiz
                {
                    Title = q.Title,
                    Description = q.Description,
                    Creation_Date = DateTime.Now.Date
                };

                db.Quizzes.Add(quiz);
                await db.SaveChangesAsync();

                return Results.Created($"/quizzes/{quiz.Id}", quiz);
            })
            .WithName("CreateQuiz")
            .WithDescription("Creates a new quiz.")
            .Produces<Quiz>(StatusCodes.Status201Created)
            .WithOpenApi();

            // Update quiz
            app.MapPut("/quizzes/{quizId}", async (QuizDbContext db, int quizId, Quiz q) =>
            {
                var quiz = await db.Quizzes.FindAsync(quizId);
                if (quiz == null)
                    return Results.NotFound();

                quiz.Title = q.Title;
                quiz.Description = q.Description;
                await db.SaveChangesAsync();

                return Results.Ok(quiz);
            })
            .WithName("UpdateQuiz")
            .WithDescription("Updates a quiz by ID.")
            .Produces<Quiz>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();

            // Delete quiz
            app.MapDelete("/quizzes/{quizId}", async (QuizDbContext db, int quizId) =>
            {
                var quiz = await db.Quizzes.FindAsync(quizId);
                if (quiz == null)
                    return Results.NotFound();

                db.Quizzes.Remove(quiz);
                await db.SaveChangesAsync();

                return Results.Ok();
            })
            .WithName("DeleteQuiz")
            .WithDescription("Deletes a quiz by ID.")
            .Produces(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithOpenApi();
        }
    }
}
