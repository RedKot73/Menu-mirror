# Deployment Guide: Configuration & Secrets

This document outlines the mandatory and optional environment variables required for a secure and functional deployment of S5Server.

## Environment Variables (.env)

The application uses environment variables for all sensitive configuration. In production, these should be managed via secure secret storage (e.g., Azure Key Vault, Kubernetes Secrets).

### 1. Critical System Configuration
These variables are **MANDATORY**. If they are missing, the application will **FAIL TO START**.

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DB_Host` | PostgreSQL server hostname | `localhost` or `db.service.local` |
| `DB_Name` | Name of the PostgreSQL database | `S5_DB_prod` |
| `DB_Username` | Database user | `s5_admin` |
| `DB_Password` | Database password | `********` |
| `JwtSettings__Secret` | Key for signing JWT tokens (min 32 chars) | `SuperSecret32CharKey2026!@#$%^&*` |

### 2. User Management
Variables for initializing the service user account.

| Variable | Description | Use Case |
| :--- | :--- | :--- |
| `SERVICE_USER_PASSWORD` | Password for the 'havrok' service user | Use with `ai/_setup_service_user.sh` |

### 3. Feature Configuration (Optional/Graceful)
If these are missing, the application will start, but specific features may be degraded or use safe defaults.

| Variable | Description | Fallback / Behavior |
| :--- | :--- | :--- |
| `TOTP__Issuer` | Label shown in Authenticator app | Defaults to `S5Server` |
| `TWO_FACTOR_MODE` | `strict` or `soft` | Defaults to `strict` |
| `JwtSettings__Issuer` | JWT Token Issuer | Defaults to `S5Server` |
| `JwtSettings__Audience`| JWT Token Audience | Defaults to `S5Server` |

---

## Operational Safety (Fail-Safe)

To prevent insecure production deployments:
1.  **JWT Secret Validation**: The application checks `JwtSettings__Secret` at startup. If the environment is `Production` and the secret is missing or matches the development hardcoded fallback, the process will terminate immediately with a `Fatal` error log.
2.  **Database Connection**: The application will attempt to connect 3 times with a 5-second delay. If the connection fails after 3 attempts, it will terminate.

> [!CAUTION]
> **Security Audit**: Never use the development default secret (`S5_DEV_SECRET_2026_DO_NOT_USE_IN_PROD_999`) in a production environment. The application is programmed to detect and block this for your security.
