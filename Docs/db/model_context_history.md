# Database & Model Context History

## Overview
This document serves as a persistent context for the `MainDbContext` model and its migration history. It tracks architectural decisions, relationships, and "gotchas" to prevent model-snapshot desynchronization.

## Key Entities Relationships

### TVezhaUser ↔ Soldier (The "Great Decouple" incident)
- **Status**: Optional One-to-One (LEFT JOIN).
- **History**:
    - **Original**: Explicit hard relationship.
    - **Migration `20260401163624_DecoupleUserAndSoldier`**: Dropped `soldier_id` column and FK in DB, but left stale configuration in C# models, causing `PendingModelChangesWarning`.
    - **Current (`RestoreUserSoldierRelation`)**: Restored as an optional link. 
- **Configuration**:
    - `TVezhaUser` has `Guid? SoldierId` and `virtual Soldier? Soldier`.
    - Fluent API: `.HasOne(u => u.Soldier).WithOne().HasForeignKey<TVezhaUser>(u => u.SoldierId).IsRequired(false)`.
- **Reasoning**: To allow independent existence of Users and Soldiers while maintaining a helper link for UI display (Soldier Name/Rank in User List).

## Migration Protocol
1. **Tooling**: Use local `dotnet-ef` tool via `dotnet ef` command.
2. **Commands**:
    - Add: `dotnet ef migrations add <Name>`
    - Remove: `dotnet ef migrations remove` (Use only if migration wasn't pushed/applied).
3. **Application**: Always run with `--migrate` flag in the environment to apply pending changes.

## Known Issues & Technical Debt
- **[TODO] MainDbContext Bloat**: `OnModelCreating` is reaching 1500+ lines.
    - **Recommendation**: Split into `IEntityTypeConfiguration<T>` classes.
- **[Warning] Model Snapshot**: Never manually edit `MainDbContextModelSnapshot.cs`. If a warning about "Pending model changes" appears, it means the C# code (Attributes or Fluent API) doesn't match what EF Core expects in the snapshot.

## Latest Significant Migrations
| Migration Name | Date | Purpose |
| :--- | :--- | :--- |
| `20260401163624_DecoupleUserAndSoldier` | 2026-04-01 | Attempted to sever link, caused sync issues. |
| `RestoreUserSoldierRelation` | 2026-04-04 | Final fix: Restored link as Optional Nullable. |
