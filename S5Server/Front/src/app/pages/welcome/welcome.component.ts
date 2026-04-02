import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../auth/auth.service';
import { SystemTimeService } from '../../core/services/system-time.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  public timeService = inject(SystemTimeService);

  readonly welcomeForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  readonly error = signal<string | null>(null);
  readonly isLoading = signal(false);
  readonly countdown = signal(10);
  readonly currentTime$ = this.timeService.utcTime$;
  private timerSub?: Subscription;

  ngOnInit(): void {
    if (this.auth.twoFactorMode() === 'soft') {
      this.startTimer();
    } else {
      this.countdown.set(0); // No timer in strict mode
    }
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

  private startTimer(): void {
    this.timerSub = interval(1000).subscribe(() => {
      if (this.countdown() > 0) {
        this.countdown.update(c => c - 1);
      } else {
        this.timerSub?.unsubscribe();
        this.autoSubmit();
      }
    });
  }

  private autoSubmit(): void {
    console.log('[DEBUG] 2FA Timer expired. Auto-submitting...');
    // If form is valid, use the code. Otherwise send empty/zero to trigger backend soft mode wait.
    const code = this.welcomeForm.value.code || '000000';
    this.submitCode(code);
  }

  onSubmit(): void {
    if (this.welcomeForm.invalid) return;
    const { code } = this.welcomeForm.value;
    if (!code) return;
    
    if (this.auth.twoFactorMode() !== 'soft') {
      this.timerSub?.unsubscribe(); // Stop timer if user submits manually only in strict mode
    } else {
      // Show simulated error for early invalid attempts without waiting for backend
      this.error.set('Очікування перевірки...'); // We can't know it's invalid instantly since backend delays 10s
    }
    this.submitCode(code);
  }

  private submitCode(code: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.auth.verifyTwoFactor(code).subscribe({
      next: (payload) => {
        if (payload.token && !payload.requiresTwoFactor) {
          // Success: fully authenticated.
          console.log('[DEBUG] 2FA Success. Token payload:', JSON.parse(atob(payload.token.split('.')[1])));
          
          // Double verify token is in localStorage before reload
          localStorage.setItem('auth_token', payload.token);
          
          console.log('[DEBUG] Hard Reload to /DocumentDataSet');
          window.location.href = '/DocumentDataSet';
        } else {
          this.error.set('Невірний код підтвердження');
          this.isLoading.set(false);
        }
      },

      error: (err) => {
        this.isLoading.set(false);
        // Check for specific GraphQL error
        const gqlError = err.error?.errors?.[0]?.message;
        if (gqlError) {
          this.error.set(gqlError);
        } else {
          this.error.set('Помилка сервера. Спробуйте пізніше.');
        }
        console.error('2FA Error:', err);
      }
    });
  }
}
