import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
  ChangePasswordDto,
  UsersService,
  PasswordRequirements,
} from '../../app/auth/users.service';

export interface ChangePasswordDialogData {
  userName: string;
  adminChange: boolean; // Чи це адміністративна зміна логіну (без поточного пароля)
}

@Component({
  selector: 'app-change-password-dialog',
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  template: `
    <h2 mat-dialog-title>Змінити пароль</h2>
    <mat-dialog-content class="dialog-content">
      <p>
        Користувач: <strong>{{ data.userName }}</strong>
      </p>

      @if (!data.adminChange) {
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Пароль користувача</mat-label>
          <input matInput type="password" [(ngModel)]="model.currentPassword" required />
        </mat-form-field>
      }

      <!-- Новий пароль з перевіркою вимог -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Новий пароль</mat-label>
        <input
          matInput
          type="password"
          [(ngModel)]="model.newPassword"
          required
          (ngModelChange)="onPasswordChange($event)"
        />
        @if (checkingPassword) {
          <mat-spinner matSuffix diameter="18"></mat-spinner>
        } @else if (passwordErrors.length) {
          <mat-icon matSuffix color="warn" [matTooltip]="passwordErrors.join('\\n')"
            >error</mat-icon
          >
        } @else if (model.newPassword && passwordValid) {
          <mat-icon matSuffix class="icon-success" matTooltip="Пароль відповідає вимогам"
            >check_circle</mat-icon
          >
        }
      </mat-form-field>
      @if (passwordErrors.length) {
        <div class="validation-errors">
          @for (err of passwordErrors; track err) {
            <p class="error-text">{{ err }}</p>
          }
        </div>
      }
      @if (passwordHints) {
        <p class="hint-text">{{ passwordHints }}</p>
      }

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Підтвердження пароля</mat-label>
        <input matInput type="password" [(ngModel)]="confirmPassword" required />
      </mat-form-field>

      @if (passwordMismatch) {
        <p class="error-text">Паролі не збігаються</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Скасувати</button>
      <button mat-flat-button color="primary" [disabled]="!canSave" (click)="save()">
        Змінити
      </button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./dialog-shared.scss'],
})
export class ChangePasswordDialogComponent implements OnInit, OnDestroy {
  private dialogRef = inject(MatDialogRef<ChangePasswordDialogComponent>);
  private usersService = inject(UsersService);
  data = inject<ChangePasswordDialogData>(MAT_DIALOG_DATA);

  model: ChangePasswordDto = { currentPassword: '', newPassword: '' };
  confirmPassword = '';

  // Validation state
  checkingPassword = false;
  passwordValid = false;
  passwordErrors: string[] = [];
  passwordHints = '';

  private readonly passwordSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Load password requirements
    this.usersService.getPasswordRequirements().subscribe((req) => {
      this.passwordHints = this.buildRequirementsHint(req);
    });

    // Debounced password validation
    this.passwordSubject
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        if (!value) {
          this.checkingPassword = false;
          this.passwordValid = false;
          this.passwordErrors = [];
          return;
        }
        this.checkingPassword = true;
        this.usersService.validatePassword(value, this.data.userName).subscribe({
          next: (res) => {
            this.checkingPassword = false;
            this.passwordValid = res.isValid;
            this.passwordErrors = res.errors ?? [];
          },
          error: () => {
            this.checkingPassword = false;
            // Allow saving — backend will reject if password doesn't meet policy
            this.passwordValid = true;
            this.passwordErrors = [];
          },
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPasswordChange(value: string): void {
    this.passwordValid = false;
    this.passwordErrors = [];
    this.passwordSubject.next(value);
  }

  get passwordMismatch(): boolean {
    return !!this.confirmPassword && this.model.newPassword !== this.confirmPassword;
  }

  get canSave(): boolean {
    if (this.checkingPassword) return false; // Block while async validation is in-flight
    const passwordOk = this.data.adminChange || !!this.model.currentPassword;
    return (
      passwordOk &&
      !!this.model.newPassword &&
      this.passwordValid &&
      this.model.newPassword === this.confirmPassword
    );
  }

  save(): void {
    if (this.canSave) {
      this.dialogRef.close(this.model);
    }
  }

  private buildRequirementsHint(req: PasswordRequirements): string {
    const parts: string[] = [];
    if (req.requiredLength > 0) {
      parts.push(`мін. ${req.requiredLength} символів`);
    }
    if (req.requireDigit) {
      parts.push('цифра');
    }
    if (req.requireLowercase) {
      parts.push('маленька літера');
    }
    if (req.requireUppercase) {
      parts.push('велика літера');
    }
    if (req.requireNonAlphanumeric) {
      parts.push('спецсимвол');
    }
    return parts.length ? 'Вимоги: ' + parts.join(', ') : '';
  }
}
