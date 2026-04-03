# Two-Factor Authentication (TOTP) — Technical Reference

> **Module**: Identity / Security
> **Library**: OtpNet (NuGet) + ASP.NET Core Identity + qrcode (npm)
> **Protocol**: RFC 6238 — TOTP (Time-based One-Time Password)
> **Last updated**: Phase 3 — Local QR rendering + Time Drift Sync

---

## 1. How TOTP Works

TOTP generates a 6-digit code that changes every **30 seconds**, derived from:
- A **shared secret** (stored server-side, known to the authenticator app via QR scan)
- The **current UTC time** (rounded to 30-second windows)

Algorithm:
```
TOTP(K, T) = HOTP(K, floor(UnixTime / 30))
HOTP(K, C)  = Truncate(HMAC-SHA1(K, C)) mod 10^6
```

---

## 2. Secret Key Generation & Storage

### Backend: `twoFactorSetup` mutation
**File**: `S5Server/GraphQL/AuthMutation.cs`

```csharp
// Check for an existing key FIRST — only generate if none exists.
var unformattedKey = await userManager.GetAuthenticatorKeyAsync(user);
if (string.IsNullOrEmpty(unformattedKey))
{
    await userManager.ResetAuthenticatorKeyAsync(user);
    unformattedKey = await userManager.GetAuthenticatorKeyAsync(user);
    Log.Information("[DEBUG] 2FA Setup initiated for User {Id}. New secret generated.", user.Id);
}
```

> [!IMPORTANT]
> `ResetAuthenticatorKeyAsync` is called **only once** per user lifetime. Subsequent calls to setup return the same key to avoid breaking existing authenticator apps.

---

## 3. Local QR Code Generation

The system has migrated from Google Charts to **local rendering** for enhanced privacy and offline compatibility.

### Protocol
- **Backend**: Returns an `otpauth://` URI and the current `ServerTimeIso`.
- **Frontend**: Uses the `qrcode` library to generate a **Base64 DataURL** entirely in the browser.

### DataURL Generation (Frontend)
**File**: `TotpSetupDialog.component.ts`
```typescript
private async generateQrCode(uri: string): Promise<void> {
  const dataUrl = await QRCode.toDataURL(uri, {
    margin: 2,
    width: 250,
    color: { dark: '#000000', light: '#ffffff' }
  });
  this.qrDataUrl.set(dataUrl);
}
```

---

## 4. Time Synchronization (Drift Control)

Since TOTP is time-based, even a small clock difference between the server and the user's phone can cause login failures.

### Server Time in Payload
The `twoFactorSetup` mutation returns `serverTimeIso` (ISO 8601).
```csharp
return new TwoFactorSetupPayload(qrUri, unformattedKey, DateTime.UtcNow.ToString("O"));
```

### Frontend Drift Detection
The dialog calculates the delta between the server and the local device:
```typescript
const drift = Math.abs(serverTime - clientTime);
this.timeDrift.set(drift);
```
If the drift exceeds **30 seconds**, a warning banner is displayed to the user to sync their device clock.

---

## 5. GraphQL Naming Conventions

The project uses **HotChocolate** as the GraphQL engine. Note the naming policies:

| C# Method/Property | GraphQL Field | Rule |
|--------------------|---------------|------|
| `GetTwoFactorStatus` | `twoFactorStatus` | `Get` prefix is stripped automatically |
| `GetTwoFactorSetup` | `twoFactorSetup` | `Get` prefix is stripped |
| `GetServerTime` | `serverTime` | `Get` prefix is stripped |
| `EnableTwoFactor` | `enableTwoFactor` | camelCase mapping |

---

## 6. Verification Windows

To improve reliability, we use a standardized verification window:

- **Setup (`EnableTwoFactor`)**: `new VerificationWindow(1, 1)` (±30s)
- **Login (`VerifyTwoFactor`)**: `new VerificationWindow(1, 1)` (±30s)

This provides adequate tolerance for network latency and minor clock drift while remaining secure.

---

## 7. Key Files Reference

| File | Role |
|------|------|
| `S5Server/GraphQL/AuthMutation.cs` | Backend logic for setup, verification, and disabling. |
| `S5Server/GraphQL/Query.cs` | `twoFactorStatus` and `serverTime` queries. |
| `Front/src/app/auth/totp.service.ts` | Angular service; handles all `/graphql` communication. |
| `Front/src/app/auth/TotpSetupDialog.component.ts` | Main UI for 2FA management; handles Local QR and Time Sync. |
| `Front/src/app/auth/auth.interceptor.ts` | Attaches JWT Bearer tokens to all requests. |
| `Docs/db-migration-protocol.md` | Protocol for managing EF Core schema changes. |

---

## 8. Troubleshooting (Common Issues)

### 400 Bad Request
- **Cause**: Schema mismatch (requesting a field starting with `get...`).
- **Fix**: Remove the `get` prefix from the query in `totp.service.ts`.

### QR Image not showing
- **Cause**: Backend not returning a valid `qrUri`.
- **Check**: Server logs for `[DEBUG] 2FA Setup initiated`.
