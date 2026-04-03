import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface TotpSetupResponse {
  sharedKey: string;
  authenticatorUri: string;
  serverTimeIso: string;
}

export interface EnableTotpResponse {
  success: boolean;
  message: string;
}

export interface TotpStatusResponse {
  isTwoFactorEnabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class TotpService {
  private readonly gql = '/graphql';
  private http = inject(HttpClient);

  /**
   * Initiates 2FA setup: generates a new TOTP secret and returns the QR URI + manual key.
   * GraphQL resolver: AuthMutation.GetTwoFactorSetup → camelCase: getTwoFactorSetup
   */
  getSetup(): Observable<TotpSetupResponse> {
    const query = `
      mutation GetTwoFactorSetup {
        twoFactorSetup {
          qrUri
          manualEntryKey
          serverTimeIso
        }
      }
    `;
    return this.http.post<any>(this.gql, { query }).pipe(
      map(res => {
        // GraphQL always returns HTTP 200 — check for error body explicitly
        if (res?.errors?.length) {
          console.error('[ERROR] 2FA getSetup GraphQL error:', res.errors);
          throw new Error(res.errors[0]?.message ?? 'GraphQL error');
        }
        const data = res?.data?.twoFactorSetup;
        console.log('[DEBUG] 2FA Setup response: qrUri present =', !!data?.qrUri, '| serverTime =', data?.serverTimeIso);
        return {
          sharedKey: data.manualEntryKey,
          authenticatorUri: data.qrUri,
          serverTimeIso: data.serverTimeIso,
        };
      }),
      catchError(err => {
        console.error('[ERROR] 2FA getSetup failed:', err?.message ?? err);
        if (err.error) {
            console.error('[DEBUG] GQL 400 Error Body:');
            console.dir(err.error);
        }
        return throwError(() => err);
      })
    );
  }

  /**
   * Submits the 6-digit TOTP code to enable 2FA for the current user.
   * GraphQL resolver: AuthMutation.EnableTwoFactor → camelCase: enableTwoFactor
   */
  enable(code: string): Observable<EnableTotpResponse> {
    const query = `
      mutation EnableTwoFactor($code: String!) {
        enableTwoFactor(code: $code)
      }
    `;
    return this.http.post<any>(this.gql, { query, variables: { code } }).pipe(
      map(res => {
        // GraphQL always returns HTTP 200 — check for error body explicitly
        if (res?.errors?.length) {
          console.error('[ERROR] 2FA enableTwoFactor GraphQL error:', res.errors);
          throw new Error(res.errors[0]?.message ?? 'GraphQL error');
        }
        const success = res?.data?.enableTwoFactor === true;
        console.log('[DEBUG] 2FA Enable response: success =', success);
        return {
          success,
          message: success ? '2FA успішно увімкнено' : 'Невірний код підтвердження',
        };
      }),
      catchError(err => {
        console.error('[ERROR] 2FA enable failed:', err?.message ?? err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Disables 2FA for the current user (requires password confirmation).
   * GraphQL resolver: AuthMutation.DisableTwoFactor → camelCase: disableTwoFactor
   */
  disable(password: string): Observable<{ success: boolean; message: string }> {
    const query = `
      mutation DisableTwoFactor($password: String!) {
        disableTwoFactor(password: $password)
      }
    `;
    return this.http.post<any>(this.gql, { query, variables: { password } }).pipe(
      map(res => {
        const success = res?.data?.disableTwoFactor === true;
        console.log('[DEBUG] 2FA Disable response: success =', success);
        return {
          success,
          message: success ? '2FA вимкнено' : 'Невірний пароль або помилка',
        };
      }),
      catchError(err => {
        console.error('[ERROR] 2FA disable failed:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Fetches the current 2FA enabled status for the authenticated user.
   * GraphQL resolver: Query.GetTwoFactorStatus → camelCase: getTwoFactorStatus
   */
  getStatus(): Observable<TotpStatusResponse> {
    const query = `
      query GetTwoFactorStatus {
        twoFactorStatus
      }
    `;
    return this.http.post<any>(this.gql, { query }).pipe(
      map(res => {
        if (res?.errors?.length) {
          throw new Error(res.errors[0]?.message ?? 'GraphQL error');
        }
        const enabled = res?.data?.twoFactorStatus === true;
        console.log('[DEBUG] 2FA Status response: isTwoFactorEnabled =', enabled);
        return { isTwoFactorEnabled: enabled };
      }),
      catchError(err => {
        console.error('[ERROR] 2FA getStatus failed:', err);
        if (err.error) {
            console.error('[DEBUG] GQL getStatus 400 Error Body:');
            console.dir(err.error);
        }
        return throwError(() => err);
      })
    );
  }
}
