# Database Migration Protocol

This document describes the Code-First migration process using Entity Framework Core for the S5Server project.

## EF Core Migrations

All database schema changes must be managed through EF Core migrations located in the `Migrations/` directory of the `S5Server` project.

### Creating a Migration

When you modify the database models (entities in `Models/` or configuration in `MainDbContext.cs`), follow these steps:

1.  **Generate the Migration**:
    Run the following command from the project root:
    ```bash
    dotnet ef migrations add <MigrationName> --project S5Server/S5Server.csproj --context S5Server.Data.MainDbContext
    ```
    This will create a new C# file in the `Migrations/` folder describing the `Up` and `Down` operations.

2.  **Review the Code**:
    Always manually inspect the generated migration file to ensure it correctly captures the intended changes and doesn't perform destructive actions (like dropping a table or column) unexpectedly.

3.  **Check for Sensitive Information**:
    Ensure no secrets or sensitive hardcoded values are included in the migration code.

### Applying Migrations

The project follows a "Self-Extinguishing Migration" pattern through the application binary.

#### Protocol: The `--migrate` Flag

The `S5Server` application binary includes built-in logic to apply migrations at startup when triggered by a specific command-line argument.

**Implementation Detail (`Program.cs`)**:
```csharp
if (args.Any(arg => arg.Trim().Contains("--migrate", StringComparison.OrdinalIgnoreCase)))
{
    Log.Information("=== Mode: Database Migration (flag --migrate detected) ===");
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<MainDbContext>();
    try {
        await dbContext.Database.MigrateAsync();
        Log.Information("=== Success: Migrations Applied! ===");
        Environment.Exit(0); // Exit after successful migration
    } catch {
        Environment.Exit(1); // Error code for infrastructure (K8s)
    }
}
```

#### Steps to Apply:
1.  **Stop** the running application.
2.  **Execute** the application with the migration flag:
    ```bash
    dotnet run --project S5Server/S5Server.csproj -- --migrate
    ```
3.  **Verify** the output logs for "Success: Migrations Applied!".
4.  **Restart** the application normally.

### Automated Pipelines (K8s)

In Kubernetes environments, migrations are handled by a **Kubernetes Job** or a **Helm Post-Install Hook** that runs the container with the `--migrate` flag before the actual application pods start. This ensures the database schema is always up-to-date before any traffic reaches the backend.

### Guidelines for AI Agents

1.  **Mandatory Documentation**: Every migration should have a clear, descriptive name (e.g., `AddTwoFactorSecretToUser`).
2.  **Mapping Consistency**: Use `SnakeCaseNamingConvention` as configured in `Program.cs`.
3.  **Data Integrity**: Prefer adding nullable columns or providing default values to avoid breaking existing datasets.
4.  **Audit**: After any migration, update relevant domain documentation (e.g., `Docs/user-entity.md`).
