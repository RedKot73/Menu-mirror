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
  public auth = inject(AuthService);
  private router = inject(Router);
  public timeService = inject(SystemTimeService);

  readonly welcomeForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  readonly error = signal<string | null>(null);
  readonly isLoading = signal(false);
  readonly currentTime$ = this.timeService.utcTime$;

  ngOnInit(): void {
    // Soft mode is now handled without artificial delays
  }

  ngOnDestroy(): void {
  }

  onSubmit(): void {
    if (this.welcomeForm.invalid) return;
    const { code } = this.welcomeForm.value;
    if (!code) return;
    
    this.submitCode(code);
  }

  private submitCode(code: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.auth.verifyTwoFactor(code).subscribe({
      next: (payload) => {
        if (payload.token && !payload.requiresTwoFactor) {
          // Success: fully authenticated.
          // Token is already persisted in AuthService.verifyTwoFactor() via setToken()
          this.router.navigate(['/DocumentDataSet']);
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
