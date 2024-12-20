
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using QuizAPI.Auth.Model;
using Microsoft.AspNetCore.Identity;


namespace QuizAPI.Auth;

public static class AuthEndpoints
{
    public static void AddAuthApi(this WebApplication app)
    {
        // register
        
        app.MapPost("api/accounts", async (UserManager<QuizUser> userManager, RegisterUserDto dto) =>
        {
            // check email exists
            var user = await userManager.FindByNameAsync(dto.UserName);
            if (user != null)
                return Results.UnprocessableEntity("Toks vartotojas jau užimtas!");

            var newUser = new QuizUser()
            {
                Email = dto.Email,
                UserName = dto.UserName,
            };

            var createUserResult = await userManager.CreateAsync(newUser, dto.Password);
            if (!createUserResult.Succeeded)
                return Results.UnprocessableEntity("Tokio vartotojo sukurti negalima.");

            await userManager.AddToRoleAsync(newUser, QuizRoles.QuizUser);

            return Results.Created();
        });

        // login
        app.MapPost("api/login", async (UserManager<QuizUser> userManager, JwtTokenService jwtTokenService, SessionService sessionService, HttpContext httpContext, LoginDto dto) =>
        {
            var request = httpContext.Request;
            var fullUrl = $"{request.Scheme}://{request.Host}{request.Path}{request.QueryString}";

            // Log the full URL for debugging purposes
            Console.WriteLine($"Request URL: {fullUrl}");

            // Check user exists
            var user = await userManager.FindByNameAsync(dto.UserName);
            if (user == null)
                return Results.UnprocessableEntity("Vartotojas neegzistuoja.");

            var isPasswordValid = await userManager.CheckPasswordAsync(user, dto.Password);
            if (!isPasswordValid)
                return Results.UnprocessableEntity("Vartotojo vardas arba el. paštas yra neteisingas.");

            var roles = await userManager.GetRolesAsync(user);

            var sessionId = Guid.NewGuid();
            var expiresAt = DateTime.UtcNow.AddDays(3);
            var accessToken = jwtTokenService.CreateAccessToken(user.UserName, user.Id, roles);
            var refreshToken = jwtTokenService.CreateRefreshToken(sessionId, user.Id, expiresAt);

            await sessionService.CreateSessionAsync(sessionId, user.Id, refreshToken, expiresAt);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None, // Use None for cross-origin requests
                Secure = true, // Use true in production with HTTPS
                Expires = expiresAt,
            };

            httpContext.Response.Cookies.Append("RefreshToken", refreshToken, cookieOptions);
            

            return Results.Ok(new SuccessfulLoginDto(accessToken, user.UserName));
        });


        app.MapPost("api/accessToken", async (UserManager<QuizUser> userManager, JwtTokenService jwtTokenService, SessionService sessionService, HttpContext httpContext) =>
        {
            if (!httpContext.Request.Cookies.TryGetValue("RefreshToken", out var refreshToken))
            {
                return Results.UnprocessableEntity();
            }

            if (!jwtTokenService.TryParseRefreshToken(refreshToken, out var claims))
            {
                return Results.UnprocessableEntity();
            }

            var sessionId = claims.FindFirstValue("SessionId");
            if (string.IsNullOrWhiteSpace(sessionId))
            {
                return Results.UnprocessableEntity();
            }

            var sessionIdAsGuid = Guid.Parse(sessionId);
            if (!await sessionService.IsSessionValidAsync(sessionIdAsGuid, refreshToken))
            {
                return Results.UnprocessableEntity();
            }

            var userId = claims.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Results.UnprocessableEntity();
            }

            var roles = await userManager.GetRolesAsync(user);

            var expiresAt = DateTime.UtcNow.AddDays(3);
            var accessToken = jwtTokenService.CreateAccessToken(user.UserName, user.Id, roles);
            var newRefreshToken = jwtTokenService.CreateRefreshToken(sessionIdAsGuid, user.Id, expiresAt);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Lax,
                Expires = expiresAt,
                //Secure = false => should be true possibly
            };

            httpContext.Response.Cookies.Append("RefreshToken", newRefreshToken, cookieOptions);

            await sessionService.ExtendSessionAsync(sessionIdAsGuid, newRefreshToken, expiresAt);

            return Results.Ok(new SuccessfulLoginDto(accessToken, user.UserName));
        });

        app.MapPost("api/logout", async (UserManager<QuizUser> userManager, JwtTokenService jwtTokenService, SessionService sessionService, HttpContext httpContext) =>
        {
            if (!httpContext.Request.Cookies.TryGetValue("RefreshToken", out var refreshToken))
            {
                return Results.UnprocessableEntity("01");
            }

            if (!jwtTokenService.TryParseRefreshToken(refreshToken, out var claims))
            {
                return Results.UnprocessableEntity("02");
            }

            var sessionId = claims.FindFirstValue("SessionId");
            if (string.IsNullOrWhiteSpace(sessionId))
            {
                return Results.UnprocessableEntity("03");
            }

            await sessionService.InvalidateSessionAsync(Guid.Parse(sessionId));
            httpContext.Response.Cookies.Delete("RefreshToken");

            return Results.Ok();
        });
    }

    public record RegisterUserDto(string UserName, string Email, string Password);
    public record LoginDto(string UserName, string Password);
    public record SuccessfulLoginDto(string AccessToken, string UserName);
}