import { Component, inject, signal, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TotpService } from './totp.service';
import { AuthService } from './auth.service';
import * as QRCode from 'qrcode';

/**
 * Dialog for managing Two-Factor Authentication (TOTP) for the current logged-in user.
 * Redesigned for local QR generation and time synchronization.
 */
@Component({
  selector: 'app-totp-setup-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon style="vertical-align: middle; margin-right: 8px;">security</mat-icon>
      Двофакторна аутентифікація
    </h2>

    <mat-dialog-content class="auth-dialog-content">

      <!-- ── LOADING ── -->
      @if (isLoading()) {
        <div style="display:flex; justify-content:center; padding:24px;">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      } @else {

        <!-- ── ERROR BANNER ── -->
        @if (errorMessage()) {
          <div style="color:#c62828; margin-bottom:14px; padding:10px 14px; background:#ffebee; border-radius:6px; font-size:14px; display:flex; align-items:center; gap:8px;">
            <mat-icon style="font-size:18px;">error_outline</mat-icon>
            {{ errorMessage() }}
          </div>
        }

        <!-- ── TIME DRIFT WARNING ── -->
        @if (timeDrift() > 30000) {
          <div style="color:#e65100; margin-bottom:14px; padding:10px 14px; background:#fff3e0; border:1px solid #ffe0b2; border-radius:6px; font-size:13px; display:flex; align-items:center; gap:8px;">
            <mat-icon style="font-size:20px;">history</mat-icon>
            <div>
              <strong>Увага!</strong> Час на вашому пристрої розбігається з сервером (дрейф: {{ (timeDrift()/1000).toFixed(1) }}с).
              Це може заважати активації 2FA. Будь ласка, перевірте налаштування часу.
            </div>
          </div>
        }

        <!-- ───────────────────────────────────────────
             STATE: 2FA DISABLED
        ─────────────────────────────────────────────── -->
        @if (!isTwoFactorEnabled()) {

          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <mat-icon style="color:#757575; font-size:22px;">no_encryption</mat-icon>
            <span style="font-size:14px;">Двофакторна аутентифікація <strong>вимкнена</strong>.</span>
          </div>

          <!-- Collapsed: show [Увімкнути 2FA] button -->
          @if (!showEnableForm() && !this.auth.isNeeds2FASetup()) {
            <button mat-raised-button color="primary" (click)="showEnableForm.set(true)">
              <mat-icon>lock</mat-icon>
              Увімкнути 2FA
            </button>
          }

          <!-- Expanded: show QR + code input -->
          @if (showEnableForm() || this.auth.isNeeds2FASetup()) {
            <div class="setup-container">

              @if (!setupData()) {
                <!-- Loading setup data -->
                <div style="display:flex; align-items:center; gap:10px; min-height:56px;">
                  <mat-spinner diameter="24" style="flex-shrink:0;"></mat-spinner>
                  <span style="font-size:13px; opacity:0.7;">Завантаження QR-коду...</span>
                </div>
              } @else {

                <!-- 2-column layout: QR left, controls right -->
                <div class="qr-setup-layout">

                  <div style="flex-shrink:0;">
                    @if (qrDataUrl()) {
                      <img
                        [src]="qrDataUrl()"
                        alt="QR Code"
                        width="200"
                        height="200"
                        style="border:1px solid #e0e0e0; border-radius:8px; padding:3px; display:block;"
                      />
                    } @else {
                      <div style="width:200px; height:200px; display:flex; align-items:center; justify-content:center; background:#f5f5f5; border-radius:8px; color:#ef5350;">
                        <mat-icon style="font-size:32px; width:32px; height:32px;">qr_code_2</mat-icon>
                      </div>
                    }
                  </div>

                  <!-- RIGHT: instructions + form -->
                  <div style="flex:1; display:flex; flex-direction:column; gap:6px;">

                    <!-- Step 1: scan QR -->
                    <p style="font-weight:600; margin:0; font-size:12px; line-height:1.4;">
                      1. Відскануйте QR в аутентифікаторі (Google Auth, Authy).
                    </p>

                    <!-- Manual key -->
                    <div style="font-size:11px; opacity:0.65; margin:0;">Або ключ вручну:</div>
                    <div style="font-family:monospace; font-size:11px; padding:6px 8px; background:#f5f5f5; border:1px dashed #bdbdbd; border-radius:6px; letter-spacing:2px; user-select:all; word-break:break-all; line-height:1.5;">
                      {{ setupData()!.sharedKey }}
                    </div>

                    <mat-divider style="margin:2px 0;"></mat-divider>

                    <!-- Step 2: verify code -->
                    <p style="font-weight:600; margin:0; font-size:12px;">
                      2. Введіть 6-значний код з додатку:
                    </p>

                    <mat-form-field appearance="outline" style="width:100%;" subscriptSizing="dynamic">
                      <mat-label>Код підтвердження</mat-label>
                      <input
                        matInput
                        [formControl]="verificationCodeControl"
                        maxlength="6"
                        inputmode="numeric"
                        autocomplete="one-time-code"
                        placeholder="000000"
                      />
                    </mat-form-field>

                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                      <button
                        mat-raised-button
                        color="primary"
                        [disabled]="verificationCodeControl.invalid || isVerifying()"
                        (click)="enableTotp()"
                      >
                        @if (isVerifying()) {
                          <mat-spinner diameter="16" style="display:inline-block; margin-right:4px;"></mat-spinner>
                        }
                        Підтвердити
                      </button>
                      @if (!this.auth.isNeeds2FASetup()) {
                        <button mat-button (click)="cancelEnable()">Скасувати</button>
                      }
                    </div>

                  </div>
                </div>
              }
            </div>
          }

        }

        <!-- ───────────────────────────────────────────
             STATE: 2FA ENABLED
        ─────────────────────────────────────────────── -->
        @if (isTwoFactorEnabled()) {

          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <mat-icon style="color:#2e7d32; font-size:22px;">verified_user</mat-icon>
            <span style="font-size:14px; color:#2e7d32;">Двофакторна аутентифікація <strong>увімкнена</strong>.</span>
          </div>

          @if (!showDisableForm()) {
            <button mat-stroked-button color="warn" (click)="showDisableForm.set(true)">
              <mat-icon>no_encryption</mat-icon>
              Вимкнути 2FA
            </button>
          } @else {
            <div style="padding:16px; background:#fff3e0; border-radius:8px; border:1px solid #ffe0b2;">
              <p style="margin:0 0 12px; font-size:14px;">
                <mat-icon style="font-size:16px; vertical-align:middle; color:#e65100; margin-right:4px;">warning</mat-icon>
                Введіть поточний пароль для підтвердження вимкнення 2FA:
              </p>
              <mat-form-field appearance="outline" style="width:100%;">
                <mat-label>Пароль</mat-label>
                <input matInput [formControl]="passwordControl" type="password" />
              </mat-form-field>
              <div style="display:flex; gap:8px; margin-top:4px;">
                <button
                  mat-raised-button
                  color="warn"
                  [disabled]="passwordControl.invalid || isVerifying()"
                  (click)="disableTotp()"
                >
                  @if (isVerifying()) {
                    <mat-spinner diameter="18" style="display:inline-block; margin-right:6px;"></mat-spinner>
                  }
                  Підтвердити вимкнення
                </button>
                <button mat-button (click)="cancelDisable()">Скасувати</button>
              </div>
            </div>
          }
        }
      }

    </mat-dialog-content>

    @if (!this.auth.isNeeds2FASetup()) {
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Закрити</button>
      </mat-dialog-actions>
    }
  `,
  styles: [`
    .auth-dialog-content {
      min-width: 320px;
      max-width: 580px;
      width: 100%;
      overflow-x: hidden;
    }
    .setup-container {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
    }
    .qr-setup-layout {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 16px;
      align-items: flex-start;
      justify-content: center;
    }
    @media (max-width: 480px) {
      .auth-dialog-content {
        min-width: 100%;
        padding: 8px !important;
      }
      .qr-setup-layout {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class TotpSetupDialogComponent implements OnInit {
  private totpService = inject(TotpService);
  private snackBar = inject(MatSnackBar);
  public auth = inject(AuthService);
  public dialogRef = inject(MatDialogRef<TotpSetupDialogComponent>);

  // ── state signals ──────────────────────────────────────────
  readonly isLoading = signal(true);
  readonly isVerifying = signal(false);
  readonly errorMessage = signal('');
  readonly isTwoFactorEnabled = signal(false);
  readonly setupData = signal<{ sharedKey: string; authenticatorUri: string; serverTimeIso: string } | null>(null);
  readonly showEnableForm = signal(false);
  readonly showDisableForm = signal(false);
  readonly qrDataUrl = signal<string | null>(null);
  readonly timeDrift = signal<number>(0);

  // ── form controls ──────────────────────────────────────────
  readonly verificationCodeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern(/^\d{6}$/),
  ]);
  readonly passwordControl = new FormControl('', Validators.required);

  // ──────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    forkJoin({
      status: this.totpService.getStatus().pipe(catchError((err) => {
        this.errorMessage.set(`Помилка статусу: ${err.message || '400 (Check Schema)'}`);
        return of({ isTwoFactorEnabled: false });
      })),
      setup: this.totpService.getSetup().pipe(catchError((err) => {
        this.errorMessage.set(`Помилка завантаження QR: ${err.message || '400 (Check Schema)'}`);
        return of(null);
      })),
    }).subscribe(({ status, setup }) => {
      this.isTwoFactorEnabled.set(status.isTwoFactorEnabled);
      if (setup) {
        this.setupData.set(setup);

        // Time Drift Calculation
        const serverTime = new Date(setup.serverTimeIso).getTime();
        const clientTime = new Date().getTime();
        const drift = Math.abs(serverTime - clientTime);
        this.timeDrift.set(drift);

        this.generateQrCode(setup.authenticatorUri);
      }
      this.isLoading.set(false);
    });
  }

  private async generateQrCode(uri: string): Promise<void> {
    try {
      const dataUrl = await QRCode.toDataURL(uri, {
        margin: 2,
        width: 200,
        color: { dark: '#000000', light: '#ffffff' }
      });
      this.qrDataUrl.set(dataUrl);
    } catch (err) {
      console.error('[ERROR] Failed to generate local QR code:', err);
    }
  }

  cancelEnable(): void {
    this.showEnableForm.set(false);
    this.verificationCodeControl.reset();
    this.errorMessage.set('');
  }

  enableTotp(): void {
    if (this.verificationCodeControl.invalid) return;
    const code = this.verificationCodeControl.value!;

    this.isVerifying.set(true);
    this.errorMessage.set('');
    this.totpService.enable(code).subscribe({
      next: (res) => {
        this.isVerifying.set(false);
        if (res.success) {
          this.snackBar.open('✅ Двофакторну аутентифікацію увімкнено', 'OK', { duration: 4000 });
          this.isTwoFactorEnabled.set(true);
          this.showEnableForm.set(false);
          this.verificationCodeControl.reset();
          this.dialogRef.close(true);
        } else {
          this.errorMessage.set('Невірний код. Перевірте синхронізацію часу в додатку і спробуйте знову.');
        }
      },
      error: (err) => {
        console.error('[ERROR] enableTwoFactor failed:', err?.message ?? err);
        this.isVerifying.set(false);
        this.errorMessage.set('Помилка сервера при активації 2FA: ' + (err?.message ?? 'невідома помилка'));
      },
    });
  }

  cancelDisable(): void {
    this.showDisableForm.set(false);
    this.passwordControl.reset();
    this.errorMessage.set('');
  }

  disableTotp(): void {
    if (this.passwordControl.invalid) return;

    this.isVerifying.set(true);
    this.errorMessage.set('');
    this.totpService.disable(this.passwordControl.value!).subscribe({
      next: (res) => {
        this.isVerifying.set(false);
        if (res.success) {
          this.snackBar.open('2FA вимкнено', 'OK', { duration: 3000 });
          this.isTwoFactorEnabled.set(false);
          this.showDisableForm.set(false);
          this.passwordControl.reset();
        } else {
          this.errorMessage.set('Невірний пароль. Спробуйте ще раз.');
        }
      },
      error: (err) => {
        console.error('[ERROR] disableTwoFactor failed:', err?.message ?? err);
        this.isVerifying.set(false);
        this.errorMessage.set('Помилка при вимкненні 2FA: ' + (err?.message ?? 'невідома помилка'));
      },
    });
  }
}
