﻿namespace QuizAPI.Auth;

using System.Runtime.InteropServices;
using QuizAPI.Auth.Model;
using Microsoft.AspNetCore.Identity;


public class AuthSeeder
{
    private readonly UserManager<QuizUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AuthSeeder(UserManager<QuizUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task SeedAsync()
    {
        await AddDefaultRolesAsync();
        await AddAdminUserAsync();
    }

    private async Task AddAdminUserAsync()
    {
        var newAdminUser = new QuizUser()
        {
            UserName = "admin",
            Email = "admin@admin.com"
        };

        var existingAdminUser = await _userManager.FindByNameAsync(newAdminUser.UserName);
        if (existingAdminUser == null)
        {
            var createAdminUserResult = await _userManager.CreateAsync(newAdminUser, "Password123!");
            if (createAdminUserResult.Succeeded)
            {
                await _userManager.AddToRolesAsync(newAdminUser, QuizRoles.All);
            }
        }
    }

    private async Task AddDefaultRolesAsync()
    {
        foreach (var role in QuizRoles.All)
        {
            var roleExists = await _roleManager.RoleExistsAsync(role);
            if (!roleExists)
                await _roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}