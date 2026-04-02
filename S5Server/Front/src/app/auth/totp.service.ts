import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface TotpSetupResponse {
  sharedKey: string;
  authenticatorUri: string;
}

export interface EnableTotpResponse {
  success: boolean;
  message: string;
  recoveryCodes: string[];
}

export interface TotpStatusResponse {
  isTwoFactorEnabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class TotpService {
  private readonly gql = '/graphql';
  private http = inject(HttpClient);

  getSetup(): Observable<TotpSetupResponse> {
    const query = `
      mutation GetSetup {
        twoFactorSetup {
          qrUri
          manualEntryKey
        }
      }
    `;
    return this.http.post<any>(this.gql, { query }).pipe(
      map(res => ({
        sharedKey: res.data.twoFactorSetup.manualEntryKey,
        authenticatorUri: res.data.twoFactorSetup.qrUri
      }))
    );
  }

  enable(code: string): Observable<EnableTotpResponse> {
    const query = `
      mutation Enable($code: String!) {
        enableTwoFactor(code: $code)
      }
    `;
    return this.http.post<any>(this.gql, { query, variables: { code } }).pipe(
      map(res => ({
        success: res.data.enableTwoFactor,
        message: res.data.enableTwoFactor ? '2FA enabled' : 'Invalid code',
        recoveryCodes: [] // Backend doesn't return codes yet in this version of mutation
      }))
    );
  }

  disable(password: string): Observable<{ message: string }> {
    const query = `
      mutation Disable($password: String!) {
        disableTwoFactor(password: $password)
      }
    `;
    return this.http.post<any>(this.gql, { query, variables: { password } }).pipe(
      map(res => ({
        message: res.data.disableTwoFactor ? '2FA disabled' : 'Failed to disable'
      }))
    );
  }

  getStatus(): Observable<TotpStatusResponse> {
    const query = `
      query GetStatus {
        twoFactorStatus
      }
    `;
    return this.http.post<any>(this.gql, { query }).pipe(
      map(res => ({
        isTwoFactorEnabled: res.data.twoFactorStatus
      }))
    );
  }
}
