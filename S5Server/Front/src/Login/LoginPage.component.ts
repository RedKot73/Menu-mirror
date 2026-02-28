import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../app/auth/auth.service';

@Component({
  selector: 's5-page-login',
  standalone: true,
  template: ` <div class="login-container">
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
  </div>`,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  styles: [
    `
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
    `,
  ],
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

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
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/units']);
        },
        error: (err) => {
          this.isLoading.set(false);
          if (err.status === 401) {
            this.errorMessage.set('Неправильний email або пароль');
          } else if (err.status === 423) {
            const detail = err.error?.detail ?? 'Обліковий запис заблокований';
            this.errorMessage.set(detail);
          } else {
            this.errorMessage.set("Помилка з'єднання з сервером");
          }
        },
      });
  }
}
