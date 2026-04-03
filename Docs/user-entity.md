# User Entity — Complete Developer Reference

> **Module**: Identity / Account Management
> **Context**: This document describes the `TVezhaUser` entity, all related DTOs, Angular frontend components, REST API endpoints, and business rules governing user management in the S5Server application.

---

## 1. Core Entity: `TVezhaUser`

**File**: `S5Server/Models/TVezhaUser.cs`

`TVezhaUser` extends `IdentityUser<Guid>` from ASP.NET Core Identity and adds domain-specific fields:

```csharp
public class TVezhaUser : IdentityUser<Guid>
{
    public virtual Soldier? Soldier { get; set; }      // optional link to soldier profile
    public DateTime? LastLoginDate { get; set; }
    public DateTime RegistrationDate { get; set; }
    public bool RequirePasswordChange { get; set; }    // forces password change on next login
    public DateTime? LastPasswordChangeDate { get; set; }
}
```

### Inherited ASP.NET Identity Fields

| Field | Type | Description |
|-------|------|-------------|
| `Id` | `Guid` | Primary key. If linked to a soldier, equals `Soldier.Id` |
| `UserName` | `string` | Login name. Unique. Min 3, max 256 chars |
| `Email` | `string?` | Optional email address |
| `PasswordHash` | `string` | Hashed password (managed by Identity) |
| `TwoFactorEnabled` | `bool` | Whether TOTP 2FA is active |
| `LockoutEnabled` | `bool` | Whether the account lockout mechanism is active |
| `LockoutEnd` | `DateTimeOffset?` | Null = not locked; future date = locked until then |
| `AccessFailedCount` | `int` | Number of consecutive failed logins |

### Key Design Decision: Optional Soldier Link

The link between a `TVezhaUser` and a `Soldier` is **optional**. System administrator accounts (e.g., `havrok`) have no associated soldier profile. When `Soldier` is `null`, the user is treated as a system-level account.

> The `Id` of the user is set to `SoldierId` if provided, otherwise a new `Guid` is generated. This creates a predictable 1-to-1 mapping between soldiers and their accounts.

---

## 2. DTOs (Data Transfer Objects)

**File**: `S5Server/Models/TVezhaUser.cs`

All DTOs are defined in the same file as the entity.

### Input DTOs (Frontend → Backend)

| DTO | Usage | Key Fields |
|-----|-------|-----------|
| `CreateUserDto` | Create a new user | `UserName`, `Password`, `Email?`, `SoldierId?`, `Roles?` |
| `ChangePasswordDto` | User changes own password | `CurrentPassword`, `NewPassword` |
| `AdminResetPasswordDto` | Admin resets password without current | `NewPassword`, `RequirePasswordChange` |
| `ChangeUsernameDto` | User changes own login | `CurrentPassword`, `NewUserName` |
| `AdminChangeUsernameDto` | Admin changes login without password | `NewUserName` |
| `SetLockoutDto` | Lock/unlock account | `Lock`, `LockoutEnd?` |
| `ValidatePasswordDto` | Check password against Identity policy | `Password`, `UserName?`, `Email?` |
| `CheckUsernameDto` | Check username availability | `UserName`, `ExcludeUserId?` |
| `CheckEmailDto` | Check email availability | `Email`, `ExcludeUserId?` |

### Output DTOs (Backend → Frontend)

| DTO | Usage | Key Fields |
|-----|-------|-----------|
| `UserDto` | Full user data (list/detail) | All fields + `Soldier?`, `Roles` |
| `UserInfoDto` | Auth response (login, me) | `Id`, `UserName`, `Roles`, `Soldier?`, `RequirePasswordChange` |
| `PasswordRequirementsDto` | Password policy info | `RequiredLength`, `RequireDigit`, etc. |

---

## 3. Backend: REST API Endpoints

**File**: `S5Server/Controllers/AccountController.cs`
**Base Route**: `/api/account`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/account` | Required | Get all users (with soldier data) |
| `GET` | `/api/account/{id}` | Required | Get user by ID (includes roles) |
| `POST` | `/api/account` | Required | Create new user |
| `DELETE` | `/api/account/{id}` | Required | Delete user |
| `POST` | `/api/account/login` | None | Authenticate (step 1) |
| `POST` | `/api/account/login-2fa` | None | Authenticate with TOTP (step 2) |
| `POST` | `/api/account/logout` | Required | Invalidate session |
| `GET` | `/api/account/me` | Required | Get current authenticated user |
| `POST` | `/api/account/{id}/change-password` | Required | Change own password |
| `POST` | `/api/account/{id}/change-username` | Required | Change own login |
| `POST` | `/api/account/{id}/lockout` | Required | Lock/unlock account |
| `POST` | `/api/account/{id}/admin-reset-password` | Required | Admin: force-reset password |
| `POST` | `/api/account/{id}/admin-change-username` | Required | Admin: force-change login |
| `GET` | `/api/account/roles` | Required | List all roles |
| `POST` | `/api/account/roles` | Required | Create new role |
| `POST` | `/api/account/{userId}/roles/{roleName}` | Required | Assign role to user |
| `DELETE` | `/api/account/{userId}/roles/{roleName}` | Required | Remove role from user |
| `GET` | `/api/account/password-requirements` | None | Get password policy |
| `POST` | `/api/account/validate-password` | None | Validate password against policy |
| `POST` | `/api/account/check-username` | None | Check username availability |
| `POST` | `/api/account/check-email` | None | Check email availability |

### Eager Loading

Users are always loaded with their `Soldier` navigation property via:
```csharp
private IQueryable<TVezhaUser> UsersQuery() => _users
    .Include(u => u.Soldier)
    .AsNoTracking();
```

---

## 4. Backend: GraphQL (Auth-Related)

**File**: `S5Server/GraphQL/AuthMutation.cs`
**File**: `S5Server/GraphQL/Query.cs`

Authentication is partially migrated to GraphQL. The following mutations/queries are GraphQL-based:

| Name | Type | Description |
|------|------|-------------|
| `login(userName, password, rememberMe)` | Mutation | Step 1 login, returns `AuthPayload` |
| `verifyTwoFactor(code)` | Mutation | Step 2 TOTP verification |
| `disableTwoFactor(password)` | Mutation | Disable 2FA for current user |
| `getTwoFactorStatus` | Query | Check if 2FA is enabled for current user |

> **Note**: User management operations (create, change password, change login, etc.) use the **REST API**, not GraphQL.

---

## 5. Frontend: Angular Components

**Module path**: `S5Server/Front/src/Login/`

### Page Component

| File | Route | Description |
|------|-------|-------------|
| `Login/Users.page.ts` | `/users` | Main user management page (list + detail panel) |
| `Login/Users.page.html` | `/users` | Template with user list and action buttons |

### Dialog Components

| File | Trigger | Purpose |
|------|---------|---------|
| `Login/dialogs/CreateUserDialog.component.ts` | "Створити" button | Create new user account |
| `Login/dialogs/ChangePasswordDialog.component.ts` | "Змінити пароль" | Change password (user or admin) |
| `Login/dialogs/ChangeLoginDialog.component.ts` | "Змінити логін" | Change username (user or admin) |

### Auth Components

| File | Route | Description |
|------|-------|-------------|
| `Login/LoginPage.component.ts` | `/login` | Login form (step 1) |
| `app/pages/welcome/welcome.component.ts` | `/welcome` | TOTP input (step 2) |
| `app/auth/TotpSetupDialog.component.ts` | Dialog | Setup 2FA (QR code + verification) |

### Angular Services

| File | Description | Transport |
|------|-------------|-----------|
| `app/auth/users.service.ts` | All user CRUD operations | REST HTTP |
| `app/auth/auth.service.ts` | Login, 2FA state management | GraphQL |
| `app/auth/totp.service.ts` | 2FA enable/disable/status | GraphQL |

---

## 6. Frontend: Form Validation Logic

### Button Enable Conditions

#### `CreateUserDialog` — Button "Створити"
```
canSave = !checkingUserName
       && !checkingPassword
       && userName is not empty
       && userNameAvailable (after async check)
       && password is not empty
       && passwordValid (after async backend check)
       && password === confirmPassword
       [soldierId is OPTIONAL — soldier link is not required]
```

#### `ChangePasswordDialog` — Button "Змінити"
```
canSave = !checkingPassword
       && (adminChange OR currentPassword is not empty)
       && newPassword is not empty
       && passwordValid (after async backend check)
       && newPassword === confirmPassword
```

#### `ChangeLoginDialog` — Button "Змінити"
```
canSave = !checkingUserName
       && newUserName is not empty
       && userNameAvailable (after async check)
       && (adminChange OR currentPassword is not empty)
```

### Async Validation Flow

Both username and password validations are **debounced (500ms)** and call server endpoints. To prevent permanent blocking when the validation server is unreachable:

- **Username check fails** → assume available (`userNameAvailable = true`); backend will reject duplicates
- **Password check fails** → assume valid (`passwordValid = true`); backend will enforce policy

---

## 7. Password Policy

Password requirements are configured in `appsettings.json` (via `PasswordOptions`) and enforced by ASP.NET Identity. The frontend fetches and displays them via:

```
GET /api/account/password-requirements → PasswordRequirementsDto
```

Validation during form entry:
```
POST /api/account/validate-password → ValidatePasswordResult { isValid, errors[] }
```

Default policy (may vary by environment):
- Minimum length: 8
- Require uppercase letter
- Require lowercase letter
- Require digit
- Require non-alphanumeric (special character)

---

## 8. 2FA (Two-Factor Authentication)

**Backend**: `S5Server/GraphQL/AuthMutation.cs`
**Frontend service**: `S5Server/Front/src/app/auth/totp.service.ts`
**Frontend dialog**: `S5Server/Front/src/app/auth/TotpSetupDialog.component.ts`

### Setup Flow
1. User opens TOTP setup dialog
2. Backend generates a TOTP secret and returns a QR code URI
3. User scans with authenticator app
4. User enters 6-digit code to verify
5. Backend enables 2FA on the account

### Login Flow (when 2FA active)
1. `POST /api/account/login` returns `{ requiresTwoFactor: true, userId }`
2. Frontend navigates to `/welcome`
3. User enters code → `mutation verifyTwoFactor(code)` via GraphQL
4. On success, JWT token returned and user redirected to `/units`

### Development Soft Mode
Set env var: `TWO_FACTOR_MODE=soft`
→ Invalid TOTP codes are accepted with a warning log. **Never use in production.**

---

## 9. Development: Auto-unlock on Startup

**File**: `S5Server/Program.cs`

In `Development` environment, the `havrok` account is automatically unlocked and its password is reset on every startup:

```csharp
// Development only — ensures test account is accessible
havrokUser.PasswordHash = userManager.PasswordHasher.HashPassword(havrokUser, "A4742A4742!");
```

> This is a development convenience. **Never replicate in production.**

---

## 10. Related Files Quick Reference

| File | Purpose |
|------|---------|
| `S5Server/Models/TVezhaUser.cs` | Entity + all DTOs |
| `S5Server/Controllers/AccountController.cs` | REST API (user CRUD, auth) |
| `S5Server/GraphQL/AuthMutation.cs` | GraphQL mutations (login, 2FA) |
| `S5Server/GraphQL/Query.cs` | GraphQL queries (2FA status) |
| `S5Server/Program.cs` | Startup, dev auto-unlock |
| `Front/src/Login/Users.page.ts` | User list page (Angular) |
| `Front/src/Login/Users.page.html` | User list template |
| `Front/src/Login/dialogs/CreateUserDialog.component.ts` | Create user dialog |
| `Front/src/Login/dialogs/ChangePasswordDialog.component.ts` | Change password dialog |
| `Front/src/Login/dialogs/ChangeLoginDialog.component.ts` | Change login dialog |
| `Front/src/app/auth/users.service.ts` | Angular REST service |
| `Front/src/app/auth/auth.service.ts` | Angular auth state + GraphQL |
| `Front/src/app/auth/totp.service.ts` | Angular 2FA service (GraphQL) |
| `Front/src/app/auth/TotpSetupDialog.component.ts` | 2FA setup dialog |
| `Front/src/app/pages/welcome/welcome.component.ts` | TOTP verification page |
| `Docs/UserSoldierAuditReport.md` | Audit of user-soldier relationship |
| `Docs/AuthNavigationLogicReport.md` | Auth flow navigation logic |
