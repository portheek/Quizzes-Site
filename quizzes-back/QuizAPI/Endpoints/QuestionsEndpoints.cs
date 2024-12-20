using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using QuizAPI.Auth.Model;
using QuizAPI.Data;
using QuizAPI.Data.Entities;
using System.Net.Http;
using System.Security.Claims;

namespace QuizAPI.Endpoints
{
    public static class QuestionsEndpoints
    {
        public static void MapQuestionsEndpoints(this WebApplication app)
        {
            // Get all questions from a quiz
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
            app.MapPost("/quizzes/{quizId}/questions", [Authorize(Roles = QuizRoles.QuizUser)] async (QuizDbContext db, int quizId, Question q, HttpContext httpContext) =>
            {
                var quiz = await db.Quizzes.FirstOrDefaultAsync(q => q.Id == quizId);

                if (quiz == null)
                {
                    return Results.NotFound();
                }

                if (!httpContext.User.IsInRole(QuizRoles.Admin) &&
                    httpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != quiz.UserId)
                {
                    return Results.Forbid();
                }

                var question = new Question
                {
                    QuestionText = q.QuestionText,
                    Quiz_id = quizId
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
            app.MapPut("/quizzes/{quizId}/questions/{questionId}", [Authorize(Roles = QuizRoles.QuizUser)] async (QuizDbContext db, int quizId, int questionId, Question q, HttpContext httpContext) =>
            {
                var question = await db.Questions.FirstOrDefaultAsync(q => q.Id == questionId && q.Quiz_id == quizId);

                if (question == null)
                {
                    return Results.NotFound();
                }

                var quiz = await db.Quizzes.FirstOrDefaultAsync(q => q.Id == quizId);

                if (!httpContext.User.IsInRole(QuizRoles.Admin) &&
                    httpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != quiz.UserId)
                {
                    return Results.Forbid();
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
            app.MapDelete("/quizzes/{quizId}/questions/{questionId}", [Authorize(Roles = QuizRoles.QuizUser)] async (QuizDbContext db, int quizId, int questionId, HttpContext httpContext) =>
            {
                var question = await db.Questions.FirstOrDefaultAsync(q => q.Id == questionId && q.Quiz_id == quizId);

                if (question == null)
                {
                    return Results.NotFound();
                }

                var quiz = await db.Quizzes.FirstOrDefaultAsync(q => q.Id == quizId);
                if (!httpContext.User.IsInRole(QuizRoles.Admin) &&
                    httpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != quiz.UserId)
                {
                    return Results.Forbid();
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
