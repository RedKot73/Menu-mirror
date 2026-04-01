import { Component, inject, signal } from '@angular/core';
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
export class WelcomeComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  public timeService = inject(SystemTimeService);

  readonly welcomeForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  readonly error = signal<string | null>(null);
  readonly isLoading = signal(false);
  readonly currentTime$ = this.timeService.utcTime$;

  onSubmit(): void {
    if (this.welcomeForm.invalid) return;

    const { code } = this.welcomeForm.value;
    if (!code) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.auth.verifyTwoFactor(code).subscribe({
      next: (payload) => {
        if (payload.token && !payload.requiresTwoFactor) {
          // Success: fully authenticated. 
          // Per user request: redirect to /DocumentDataSet with a hard page reload.
          window.location.href = '/DocumentDataSet';
        } else {
          this.error.set('Невірний код підтвердження');
          this.isLoading.set(false);
        }
      },

      error: (err) => {
        this.error.set('Помилка сервера. Спробуйте пізніше.');
        this.isLoading.set(false);
        console.error('2FA Error:', err);
      }
    });
  }
}
