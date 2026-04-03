# Two-Factor Authentication (TOTP) — Technical Reference

> **Module**: Identity / Security
> **Library**: OtpNet (NuGet) + ASP.NET Core Identity + qrcode (npm)
> **Protocol**: RFC 6238 — TOTP (Time-based One-Time Password)
> **Last updated**: Phase 3 — Local QR rendering + Time Drift Sync + Deploy Setup

---

## 1. How TOTP Works

TOTP generates a 6-digit code that changes every **30 seconds**, derived from:
- A **shared secret** (stored server-side, known to the authenticator app via QR scan)
- The **current UTC time** (rounded to 30-second windows)

```
TOTP(K, T) = HOTP(K, floor(UnixTime / 30))
HOTP(K, C)  = Truncate(HMAC-SHA1(K, C)) mod 10^6
```

Both sides compute the same code independently — the code is never transmitted during setup.

### Examples of Data Types
| Type | Example | Format |
|---|---|---|
| **Shared Secret** | `JBSWY3DPEHPK3PXP` | Base32 string (8-32+ chars) |
| **Verification Code** | `123456` | 6-digit numeric string |
| **Recovery Codes** | `ABCD-1234-EFGH` | Optional backup (not yet implemented) |

---

## 2. Deploy Setup & Configuration

> [!IMPORTANT]
> This section is mandatory before enabling 2FA in any environment. Incorrect configuration will cause all TOTP codes to be rejected.

### 2.1 Required Environment Variables

All variables below must be set in the deployment environment. For local development, they are defined in `.env`. For Kubernetes/production, they are injected via Kubernetes Secrets or Azure Key Vault.

```env
# ── JWT Settings (MANDATORY) ──────────────────────────────────────────────
# The JWT secret MUST be a long, random, unique string per environment.
# WARNING: The default value from appsettings.json must NEVER be used in production.
JwtSettings__Secret=4f7a9b2c8e5f1d3a6c0b9a8f7e6d5c4b3a2a1b0c9d8e7f6a0b1c2d3e4f5a6b7c
JwtSettings__Issuer=S5Server
JwtSettings__Audience=S5Server
JwtSettings__ExpiryInMinutes=120

# ── TOTP Issuer (MANDATORY) ───────────────────────────────────────────────
# This is the name that appears in the user's authenticator app (e.g., "S5Server [havrok]").
# If not set, falls back to JwtSettings__Issuer, then hardcoded "S5Server".
TOTP__Issuer=S5Server

# ── 2FA Mode (MANDATORY in Production) ───────────────────────────────────
# soft  → wrong TOTP codes are accepted after a 10-second delay (DEV ONLY, UNSAFE)
# strict → correct TOTP code required (default for all non-development environments)
TWO_FACTOR_MODE=strict
```

> [!CAUTION]
> **Never deploy with `TWO_FACTOR_MODE=soft`**. This bypasses all TOTP security and allows any code to authenticate successfully after a 10-second delay. It is designed exclusively for local development and testing.

> [!CAUTION]
> **The `JwtSettings__Secret` default value `SuperSecretKeyForJWTNormalization2026!` from `appsettings.json` is a known placeholder.** Replace it with a cryptographically random string of at least 32 characters before any production or staging deployment.

### 2.5 Operational Resilience (Fail-Safe Configuration)

To prevent total application failure or insecure deployments due to misconfiguration, the following mechanisms are in place:

1.  **JWT Startup Validation (Fail-Fast)**:
    - **Development**: If `JwtSettings__Secret` is missing from the environment, the app uses a fallback: `S5_DEV_SECRET_2026_DO_NOT_USE_IN_PROD_999`.
    - **Production**: The app verifies the secret at startup. If it is **missing** OR matches the **development fallback**, the process terminates with a `Fatal` error log. This prevents starting an insecure system.

2.  **2FA Graceful Degradation (Isolation)**:
    - If `TOTP__Issuer` is missing, basic authentication (username/password) still works.
    - If a user requiring 2FA logs in but the server-side configuration is broken:
        - The `VerifyTwoFactor` mutation will return a user-friendly error instead of a generic 500 crash.
        - 2FA setup functionality will be disabled with a descriptive error.
    - This ensures that a 2FA configuration error doesn't take the entire application offline.

### 2.2 Where Secrets Are Read (Priority Order)

The backend reads configuration using ASP.NET Core's standard layered configuration:

| Priority | Source | Used for |
|---|---|---|
| 1 (highest) | Environment Variables | Kubernetes, Azure App Service, `.env` via launch scripts |
| 2 | `appsettings.{Environment}.json` | Environment-specific overrides |
| 3 (lowest) | `appsettings.json` | Fallback defaults (must not contain real secrets) |

The fallback chain for the TOTP Issuer name in `AuthMutation.cs`:
```csharp
var issuer = config["TOTP__Issuer"]          // env var (preferred)
          ?? config["JwtSettings:Issuer"]     // jwt settings fallback
          ?? "S5Server";                      // hardcoded last resort
```

### 2.3 Generating a Secure JWT Secret

```bash
# Linux / macOS — generate a 64-character random hex string
openssl rand -hex 32

# Windows PowerShell
[System.Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Max 256) }))
# Example Output: rY6+zP9lWjQ+kR5zU1uXW4yZwV7xS9zT2uXW4yZwV7w=
```

Use the output as the value for `JwtSettings__Secret`.

### 2.4 Local Development Setup (`.env`)

The `.env` file (project root) is loaded by `ai/_run.s5app.sh` and `ai/_run.s5app.ps1`. Keys use double-underscore `__` to map to nested configuration sections in ASP.NET Core:

```env
JwtSettings__Secret=<replace-with-local-dev-secret>
JwtSettings__Issuer=S5Server
JwtSettings__Audience=S5Server
JwtSettings__ExpiryInMinutes=120
TOTP__Issuer=S5Server
TWO_FACTOR_MODE=strict     # use 'soft' only if you need to bypass TOTP during dev
ASPNETCORE_ENVIRONMENT=Development
```

---

## 3. Server Time Synchronization

> [!IMPORTANT]
> **TOTP is extremely sensitive to clock drift.** If the server's system clock differs from the user's device clock by more than **30 seconds**, TOTP verification will fail for correctly configured users.

### 3.1 Why It Matters

The TOTP algorithm uses `floor(UnixTime / 30)` as a time step counter. A 31-second difference means the server and the client are on *different steps* and will compute different codes — even with the same secret key.

### 3.2 Server Time Sync (Linux / Kubernetes)

Ensure the server running the .NET application uses NTP synchronization:

```bash
# Check current NTP sync status
timedatectl status

# Expected output:
#   NTP service: active
#   System clock synchronized: yes
#   Time zone: UTC (or your configured zone)

# Enable NTP if not active
sudo timedatectl set-ntp true

# Restart system time sync
sudo systemctl restart systemd-timesyncd
```

For **Kubernetes pods**, time synchronization is inherited from the host node. Ensure the cluster nodes use NTP. For managed clusters (GKE, AKS, EKS), this is handled automatically.

### 3.3 Recommended Time Zone

> [!TIP]
> Configure the server to use **UTC** (`TZ=UTC`). TOTP uses Unix timestamps (UTC epoch), so using UTC on the server avoids any possible daylight saving time (DST) issues.

```bash
# Set server timezone to UTC
sudo timedatectl set-timezone UTC
```

### 3.4 Frontend Time Drift Detection

The `twoFactorSetup` mutation returns `ServerTimeIso` (current UTC from the server). The `TotpSetupDialogComponent` calculates the absolute difference:

```typescript
const drift = Math.abs(serverTime - clientTime); // milliseconds
this.timeDrift.set(drift);
```

If drift exceeds **30,000ms (30 seconds)**, a warning banner is displayed:
> ⚠ **Увага!** Час на вашому пристрої розбігається з сервером (дрейф: XX.Xs). Будь ласка, перевірте налаштування часу.

This is a **client-side warning only** — the backend does not use the client's reported time. It uses `DateTime.UtcNow` from the server.

### 3.5 Verification Window

Both setup and login verification use a symmetric ±30-second window (one step in each direction):

```csharp
var isValid = totp.VerifyTotp(code, out _, new VerificationWindow(1, 1));
```

This means a total tolerance of **±30 seconds** (1 step = 30s forward or backward). Users with clocks up to 30 seconds off will still authenticate successfully.

---

## 4. Secret Key Generation & Storage

### Backend: `twoFactorSetup` mutation
**File**: `S5Server/GraphQL/AuthMutation.cs`

```csharp
// Only generates a new key if none exists — prevents breaking existing authenticator apps.
var unformattedKey = await userManager.GetAuthenticatorKeyAsync(user);
if (string.IsNullOrEmpty(unformattedKey))
{
    await userManager.ResetAuthenticatorKeyAsync(user);
    unformattedKey = await userManager.GetAuthenticatorKeyAsync(user);
}
```

> [!IMPORTANT]
> `ResetAuthenticatorKeyAsync` is called **only once** per user. Subsequent calls return the existing key. This is intentional — regenerating would invalidate all configured authenticator apps for that user.

### Storage Locations

| Location | Content | Notes |
|---|---|---|
| PostgreSQL `AspNetUserTokens` | TOTP secret (Base32) | `LoginProvider='[AspNetUserStore]'`, `Name='AuthenticatorKey'` |
| PostgreSQL `AspNetUsers` | `TwoFactorEnabled` flag (bool) | Toggled by `EnableTwoFactor` / `DisableTwoFactor` mutations |
| User's authenticator app | Copy of the secret | Stored locally on the user's device after QR scan |
| Server logs | ❌ Never logged | The secret and full QR URI must NEVER appear in any log output |

---

## 5. QR Code Generation

The system uses **local QR generation** in the browser via the `qrcode` npm library (no external services like Google Charts).

### otpauth URI Format

```
otpauth://totp/{Issuer}:{Email}?secret={Base32Secret}&issuer={Issuer}
```

**Example:**
```
otpauth://totp/S5Server:havrok%40unit.mil?secret=JBSWY3DPEHPK3PXP&issuer=S5Server
```

### Frontend Generation

```typescript
// TotpSetupDialog.component.ts
const dataUrl = await QRCode.toDataURL(uri, {
  margin: 2,
  width: 148,
  color: { dark: '#000000', light: '#ffffff' }
});
this.qrDataUrl.set(dataUrl);
```

The `dataUrl` is a `data:image/png;base64,...` string rendered as an `<img>` tag. No network request is made for QR generation.

---

## 6. GraphQL Naming Policy

> [!WARNING]
> HotChocolate automatically strips the `Get` prefix from C# method names. Always verify names against the schema using introspection if a `400 Bad Request` error occurs.

| C# Method | GraphQL Field | Rule |
|---|---|---|
| `GetTwoFactorSetup` | `twoFactorSetup` | `Get` prefix stripped + camelCase |
| `GetTwoFactorStatus` | `twoFactorStatus` | `Get` prefix stripped + camelCase |
| `EnableTwoFactor` | `enableTwoFactor` | camelCase only |
| `DisableTwoFactor` | `disableTwoFactor` | camelCase only |
| `VerifyTwoFactor` | `verifyTwoFactor` | camelCase only |

**Introspection command to verify live schema:**
```bash
curl -s -X POST http://localhost:5001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __type(name:\"AuthMutation\") { fields { name } } }"}' | jq .
```

---

## 7. Authentication Flow

### Login Sequence (2FA Enabled User)

```
1. POST /graphql  →  mutation login(userName, password)
   ← { token: "<interim JWT>", requiresTwoFactor: true, userId: "..." }

2. Frontend stores interim JWT in localStorage
   AuthService.pendingTwoFactor.set({ userId })

3. Angular Router navigates to /welcome  (twoFactorGuard allows)

4. User opens authenticator app, reads current 6-digit code

5. POST /graphql  →  mutation verifyTwoFactor(code)  [Authorization: Bearer <interim JWT>]
   ← { token: "<final JWT>", requiresTwoFactor: false, user: {...} }

6. Angular Router navigates to /DocumentDataSet  (authGuard allows)
```

### Interim JWT Claims

The interim token includes a custom claim `requiresTwoFactor: "true"`. This claim is checked by:
- `AuthService.trySetPendingFromToken()` — sets the `pendingTwoFactor` signal
- `AuthService.checkSession()` — skips the `/api/account/me` call to prevent unintended logout

```csharp
new Claim("requiresTwoFactor", isInterim.ToString().ToLower()),
```

---

## 8. Key Files Reference

| File | Role |
|---|---|
| `S5Server/GraphQL/AuthMutation.cs` | `twoFactorSetup`, `enableTwoFactor`, `disableTwoFactor`, `verifyTwoFactor` |
| `S5Server/GraphQL/Query.cs` | `twoFactorStatus` query |
| `S5Server/Models/AuthPayload.cs` | `AuthPayload` record returned by login and verify mutations |
| `Front/src/app/auth/totp.service.ts` | Angular service — all 2FA GraphQL calls |
| `Front/src/app/auth/TotpSetupDialog.component.ts` | 2FA management dialog (QR + code entry + disable) |
| `Front/src/app/auth/auth.service.ts` | `login()`, `verifyTwoFactor()`, `checkSession()` — interim token guard |
| `Front/src/app/auth/auth.guard.ts` | `twoFactorGuard`, `authGuard` |
| `Front/src/app/auth/auth.models.ts` | `AuthPayload`, `AuthUser` TypeScript interfaces |
| `Front/src/app/app.config.ts` | `APP_INITIALIZER` calls `checkSession()` on bootstrap |
| `Front/src/Login/Users.page.ts` | Opens `TotpSetupDialogComponent` via `MatDialog.open()` |
| `.env` | Local environment secrets (never commit to version control) |
| `ai/_run.s5app.sh` | Sources `.env` and starts the application |

---

## 9. Debug Log Reference

### Server Console (Serilog)

| Log message | Meaning |
|---|---|
| `[DEBUG] 2FA Setup initiated for User {Id}. New secret generated.` | First-time setup — key created |
| `[DEBUG] 2FA Setup initiated for User {Id}. Returning EXISTING secret.` | Key already exists — no regeneration |
| `[DEBUG] TOTP Verification. User: X. Result: Success/Fail.` | Code checked during activation |
| `[DEBUG] 2FA enabled for user {UserName}.` | 2FA flag set to `true` in DB |
| `[DEBUG] 2FA enabled for user {UserName}. Generating interim token.` | Login step 1 — interim JWT issued |
| `[DEBUG] 2FA SUCCESS for user {UserName}. Token length: {len}` | Final JWT issued after valid TOTP |
| `[DEBUG] 2FA Check Failed for user {name}. Soft Mode active: Waiting 10s...` | Wrong code, soft mode (DEV only) |
| `[DEBUG] 2FA Toggle changed for user {UserName}. Status: Disabled.` | 2FA disabled by user |

### Browser Console (Angular)

| Log message | Meaning |
|---|---|
| `[DEBUG] TotpSetupDialog opened — loading status + time-sync setup.` | Dialog opened |
| `[DEBUG] Time sync audit: Server=X, Client=Y, Drift=Zms` | Clock delta between server and user device |
| `[DEBUG] Local QR Code generated successfully.` | QR rendered from local `qrcode` library |
| `[DEBUG] checkSession: interim token detected via JWT claim — skipping /me call.` | APP_INITIALIZER correctly skipped with interim token |
| `[DEBUG] 2FA required. Navigating to /welcome via SPA router.` | Correct navigation to 2FA verification step |
| `[DEBUG] 2FA Success. Navigating to /DocumentDataSet via SPA router.` | Full authentication complete |
| `[ERROR] 2FA getSetup GraphQL error: [...]` | Schema mismatch or unauthorized — check field names and token |
