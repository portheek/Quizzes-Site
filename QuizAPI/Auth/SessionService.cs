

using QuizAPI.Data;
using QuizAPI.Data.Entities;
using System.Security.Cryptography;
using System.Text;

namespace QuizAPI.Auth;


public class SessionService(QuizDbContext dbContext)
{
    public async Task CreateSessionAsync(Guid sessionId, string userId, string refreshToken, DateTime expiresAt)
    {
        dbContext.Sessions.Add(new Session
        {
            Id = sessionId,
            UserId = userId,
            InitiatedAt = DateTimeOffset.UtcNow,
            ExpiresAt = expiresAt,
            LastRefreshToken = ToSHA256(refreshToken)
        }); ;

        await dbContext.SaveChangesAsync();
    }

    public async Task ExtendSessionAsync(Guid sessionId, string refreshToken, DateTime expiresAt)
    {
        var session = await dbContext.Sessions.FindAsync(sessionId);
        session.ExpiresAt = expiresAt;
        session.LastRefreshToken = ToSHA256(refreshToken);

        await dbContext.SaveChangesAsync();
    }

    public async Task InvalidateSessionAsync(Guid sessionId)
    {
        var session = await dbContext.Sessions.FindAsync(sessionId);
        if (session is null)
        {
            return;
        }
        session.IsRevoked = true;

        await dbContext.SaveChangesAsync();
    }

    public async Task<bool> IsSessionValidAsync(Guid sessionId, string refreshToken)
    {
        var session = await dbContext.Sessions.FindAsync(sessionId);
        return session is not null && session.ExpiresAt > DateTimeOffset.UtcNow && !session.IsRevoked &&
               session.LastRefreshToken == ToSHA256(refreshToken);
    }

    private static string ToSHA256(string input)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(input);
        var hashBytes = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hashBytes);
    }
}