# Authorization & 2FA Analysis Report

Based on the `.ai-context.md` file, here is the current logic for authorization, 2FA, and navigation:

## 1. Authorization & 2FA Logic
- **2-Step Login Sequence (GraphQL):** 
  - *Step 1:* `AuthMutation.Login` verifies credentials and returns an interim token if 2FA is enabled.
  - *Step 2:* `AuthMutation.VerifyTwoFactor` validates the TOTP code and exchanges the interim token for the final JWT.
- **2FA Setup & Security:**
  - **Local QR Generation:** Uses the `qrcode` npm library locally; no external APIs (like Google Charts) are used.
  - **Time Drift Protection:** The server provides `ServerTimeIso`. The frontend calculates time drift and warns the user if it exceeds 30 seconds to prevent synchronization issues.
  - **Verification Window:** Uses a ±30s window for both setup and login.
  - **Key Persistence:** `twoFactorSetup` returns existing keys to prevent invalidating current devices.
- **Development Mode:** Setting `TWO_FACTOR_MODE=soft` in `.env` logs a warning but grants access even if the 2FA code is incorrect (strictly for local dev).

## 2. Navigation & Route Guards
- **Routes:**
  - `/login` (`LoginPage`): Handles initial authentication and JWT mutations.
  - `/welcome` (`WelcomeComponent`): Handles the 2FA TOTP code entry and verification.
- **Route Guards (`authGuard` & `twoFactorGuard`):**
  - If a user tries to access protected routes but requires 2FA (`requiresTwoFactor()`), they are redirected to `/welcome`.
  - If they are fully authenticated (`isAuthenticated()`), access is allowed.
  - If neither condition is met, they are redirected to `/login`.
  - `twoFactorGuard` ensures only users pending 2FA verification can access the `/welcome` route; otherwise, they are sent to `/login`.
