using Microsoft.AspNetCore.Identity;

namespace S5Server.Data;

public static class DbInitializer
{
    public static async Task SeedRoles(RoleManager<IdentityRole<Guid>> roleManager)
    {
        string[] roles = { "Admin", "Commander", "Operator", "Viewer" };

        foreach (var roleName in roles)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>
                {
                    Id = Guid.NewGuid(),
                    Name = roleName
                });
            }
        }
    }
}