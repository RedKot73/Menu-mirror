import { Component, inject, signal, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TotpService } from './totp.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-totp-setup-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>Налаштування двофакторної аутентифікації</h2>
    <mat-dialog-content>
      @if (isLoading()) {
        <div style="display: flex; justify-content: center; padding: 20px;">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      } @else {
        
        @if (errorMessage()) {
          <div style="color: red; margin-bottom: 12px; padding: 8px; background: #ffebee; border-radius: 4px;">
            {{ errorMessage() }}
          </div>
        }

        @if (!isTwoFactorEnabled()) {
          <div style="margin-bottom: 16px;">
            <p>Двофакторна аутентифікація зараз <strong>вимкнена</strong>.</p>
            <p style="font-size: 14px; opacity: 0.8;">
              Захистіть свій акаунт, увімкнувши додатковий крок перевірки при вході (наприклад, через Google Authenticator).
            </p>
          </div>

          @if (!setupData()) {
            <button mat-raised-button color="primary" (click)="startSetup()">Налаштувати 2FA</button>
          } @else {
            <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
              <p style="font-weight: 500;">1. Додайте ключ в додаток-аутентифікатор:</p>
              <div style="font-family: monospace; font-size: 18px; padding: 12px; background: #fff; border: 1px dashed #ccc; text-align: center; letter-spacing: 2px;">
                {{ setupData()?.sharedKey }}
              </div>
              
              <p style="font-weight: 500; margin-top: 16px;">2. Введіть згенерований 6-значний код для підтвердження:</p>
              
              <mat-form-field appearance="outline" style="width: 100%;">
                <mat-label>Код підтвердження</mat-label>
                <input matInput [formControl]="verificationCodeControl" maxlength="6" autocomplete="off" />
              </mat-form-field>

              <button mat-raised-button color="primary" [disabled]="verificationCodeControl.invalid" (click)="enableTotp()">
                Увімкнути
              </button>
              <button mat-button (click)="cancelSetup()" style="margin-left: 8px;">Скасувати</button>
            </div>
          }
        } @else {
          <!-- Two Factor is Enabled -->
          <div style="margin-bottom: 16px;">
            <p style="color: green;">
              Двофакторна аутентифікація <strong>увімкнена</strong>.
            </p>
          </div>

          @if (!showDisableForm()) {
            <button mat-raised-button color="warn" (click)="showDisableForm.set(true)">Вимкнути 2FA</button>
          } @else {
            <div style="margin-top: 16px; padding: 16px; background: #fff3e0; border-radius: 4px;">
              <p>Для вимкнення введіть ваш поточний пароль від акаунту:</p>
              
              <mat-form-field appearance="outline" style="width: 100%;">
                <mat-label>Пароль</mat-label>
                <input matInput [formControl]="passwordControl" type="password" />
              </mat-form-field>

              <button mat-raised-button color="warn" [disabled]="passwordControl.invalid" (click)="disableTotp()">
                Підтвердити вимкнення
              </button>
              <button mat-button (click)="cancelDisable()" style="margin-left: 8px;">Скасувати</button>
            </div>
          }
        }
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Закрити</button>
    </mat-dialog-actions>
  `
})
export class TotpSetupDialogComponent implements OnInit {
  private totpService = inject(TotpService);
  private snackBar = inject(MatSnackBar);
  public dialogRef = inject(MatDialogRef<TotpSetupDialogComponent>);

  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly isTwoFactorEnabled = signal(false);
  readonly setupData = signal<{ sharedKey: string; authenticatorUri: string } | null>(null);
  readonly showDisableForm = signal(false);

  readonly verificationCodeControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
  readonly passwordControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isLoading.set(true);
    this.totpService.getStatus().subscribe({
      next: (res) => {
        this.isTwoFactorEnabled.set(res.isTwoFactorEnabled);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Не вдалося отримати статус 2FA');
        this.isLoading.set(false);
      }
    });
  }

  startSetup(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.totpService.getSetup().subscribe({
      next: (res) => {
        this.setupData.set(res);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Не вдалося розпочати налаштування 2FA');
        this.isLoading.set(false);
      }
    });
  }

  cancelSetup(): void {
    this.setupData.set(null);
    this.verificationCodeControl.reset();
    this.errorMessage.set('');
  }

  enableTotp(): void {
    if (this.verificationCodeControl.invalid) return;
    
    this.isLoading.set(true);
    this.totpService.enable(this.verificationCodeControl.value!).subscribe({
      next: (res) => {
        this.snackBar.open('Двофакторну аутентифікацію увімкнено успішно', 'OK', { duration: 3000 });
        this.isTwoFactorEnabled.set(true);
        this.setupData.set(null);
        this.verificationCodeControl.reset();
        
        // Show recovery codes to user ? They are returned in res.recoveryCodes
        // For simplicity, we can alert or log them, but usually they should be shown in a dialog.
        alert('Резервні коди: ' + res.recoveryCodes.join(', ') + '. Збережіть їх!');
        
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Неправильний код або помилка сервера');
        this.isLoading.set(false);
      }
    });
  }

  cancelDisable(): void {
    this.showDisableForm.set(false);
    this.passwordControl.reset();
    this.errorMessage.set('');
  }

  disableTotp(): void {
    if (this.passwordControl.invalid) return;

    this.isLoading.set(true);
    this.totpService.disable(this.passwordControl.value!).subscribe({
      next: () => {
        this.snackBar.open('Двофакторну аутентифікацію вимкнено', 'OK', { duration: 3000 });
        this.isTwoFactorEnabled.set(false);
        this.showDisableForm.set(false);
        this.passwordControl.reset();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Помилка при вимкненні (можливо, невірний пароль)');
        this.isLoading.set(false);
      }
    });
  }
}
