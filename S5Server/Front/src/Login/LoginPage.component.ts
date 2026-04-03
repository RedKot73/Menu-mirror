import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../app/auth/auth.service';
import { UsersService } from '../app/auth/users.service';
import {
  ChangePasswordDialogComponent,
  ChangePasswordDialogData,
} from './dialogs/ChangePasswordDialog.component';
import { SystemTimeService } from '../app/core/services/system-time.service';

@Component({
  selector: 's5-page-login',
  standalone: true,
  template: `
    <div class="login-container">
      <h2>Вхід в систему</h2>

      @if (errorMessage()) {
        <div class="error-message">{{ errorMessage() }}</div>
      }

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>Логін</mat-label>
          <input matInput formControlName="login" autocomplete="username" />
          @if (loginForm.controls.login.hasError('required')) {
            <mat-error>Логін обов'язковий</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Пароль</mat-label>
          <input
            matInput
            formControlName="password"
            type="password"
            autocomplete="current-password"
          />
          @if (loginForm.controls.password.hasError('required')) {
            <mat-error>Пароль обов'язковий</mat-error>
          }
        </mat-form-field>

        <mat-checkbox formControlName="rememberMe">Запам'ятати мене</mat-checkbox>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="loginForm.invalid || isLoading()"
        >
          @if (isLoading()) {
            <mat-spinner diameter="20"></mat-spinner>
          } @else {
            Увійти
          }
        </button>
      </form>
    </div>
    <div class="version-info">Версія: 1.0.0</div>
    <div class="utc-clock">UTC: {{ utcTime$ | async | date:'yyyy-MM-dd HH:mm:ss':'UTC' }}</div>`,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  styles: [
    `
      .utc-clock {
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        color: rgba(63, 81, 181, 0.75);
        letter-spacing: 0.5px;
        white-space: nowrap;
      }
      .login-container {
        max-width: 400px;
        margin: 80px auto;
        padding: 24px;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .error-message {
        color: #f44336;
        background: #ffebee;
        padding: 8px 12px;
        border-radius: 4px;
        margin-bottom: 8px;
      }
      button[mat-raised-button] {
        height: 48px;
        font-size: 16px;
        margin-top: 8px;
      }
      .version-info {
        position: fixed;
        bottom: 10px;
        right: 10px;
        font-size: 12px;
        color: #aaa;
      }
    `,
  ],
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private usersService = inject(UsersService);
  private systemTimeService = inject(SystemTimeService);

  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  readonly utcTime$ = this.systemTimeService.utcTime$;

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { login, password, rememberMe } = this.loginForm.value;

    this.auth
      .login({
        userName: login!,
        password: password!,
        rememberMe: rememberMe ?? false,
      })
      .subscribe({
        next: (payload) => {
          this.isLoading.set(false);
          // requiresTwoFactor is checked FIRST — the interim token is also present
          // in this case, so order is critical to avoid the wrong branch executing.
          if (payload.requiresTwoFactor) {
            this.router.navigate(['/welcome']);
          } else if (payload.token) {
            this.router.navigate(['/DocumentDataSet']);
          } else {
            this.errorMessage.set('Неправильний логін або пароль');
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          // GraphQL errors might come as 200 with errors array, but if they come as HTTP errors:
          if (err.status === 403 && err.error?.requirePasswordChange) {
            this.openForceChangePassword(err.error.userId, login!);
          } else if (err.status === 401 || (err.error?.errors && err.error.errors.some((e: any) => e.message?.includes('Unauthorized')))) {
            this.errorMessage.set('Неправильний логін або пароль');
          } else if (err.status === 423) {
            const detail = err.error?.detail ?? 'Обліковий запис заблокований';
            this.errorMessage.set(detail);
          } else {
            // Check if it's a GraphQL error inside the response
            const gqlError = err.error?.errors?.[0]?.message;
            if (gqlError) {
              this.errorMessage.set(gqlError);
            } else {
              this.errorMessage.set("Помилка з'єднання з сервером");
            }
          }
        },
      });
  }

  private openForceChangePassword(userId: string, userName: string): void {
    this.errorMessage.set('Необхідно змінити пароль для продовження роботи');

    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { userName } as ChangePasswordDialogData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading.set(true);
        this.usersService.changePassword(userId, result).subscribe({
          next: () => {
            this.errorMessage.set('');
            this.snackBar.open('Пароль успішно змінено. Увійдіть з новим паролем.', 'OK', {
              duration: 5000,
            });
            this.loginForm.patchValue({ password: result.newPassword });
            this.isLoading.set(false);
            this.onSubmit();
          },
          error: (err) => {
            this.isLoading.set(false);
            const msg = err.error?.detail || 'Помилка зміни пароля';
            this.errorMessage.set(msg);
          },
        });
      }
    });
  }
}
