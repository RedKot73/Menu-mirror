import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TotpSetupResponse {
  sharedKey: string;
  authenticatorUri: string;
}

export interface EnableTotpResponse {
  message: string;
  recoveryCodes: string[];
}

export interface RecoveryCodesResponse {
  recoveryCodes: string[];
}

export interface TotpStatusResponse {
  isTwoFactorEnabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class TotpService {
  private readonly api = '/api/totp';
  private http = inject(HttpClient);

  getSetup(): Observable<TotpSetupResponse> {
    return this.http.get<TotpSetupResponse>(`${this.api}/setup`);
  }

  enable(code: string): Observable<EnableTotpResponse> {
    return this.http.post<EnableTotpResponse>(`${this.api}/enable`, { code });
  }

  disable(password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.api}/disable`, { password });
  }

  getRecoveryCodes(): Observable<RecoveryCodesResponse> {
    return this.http.get<RecoveryCodesResponse>(`${this.api}/recovery-codes`);
  }

  getStatus(): Observable<TotpStatusResponse> {
    return this.http.get<TotpStatusResponse>(`${this.api}/status`);
  }
}
