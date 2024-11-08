
using QuizAPI.Data;
using QuizAPI.Endpoints;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<QuizDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapQuizEndpoints();
app.MapQuestionsEndpoints();
app.MapAnswersEndpoints();


app.Run();
