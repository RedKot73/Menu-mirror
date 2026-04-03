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
  ChangeUsernameDto,
  UsersService,
} from '../../app/auth/users.service';

export interface ChangeLoginDialogData {
  userId: string;
  userName: string;
  adminChange: boolean; // Чи це адміністративна зміна логіну (без поточного пароля)
}

@Component({
  selector: 'app-change-login-dialog',
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
    <h2 mat-dialog-title>Змінити логін</h2>
    <mat-dialog-content class="dialog-content">
      <p>Користувач: <strong>{{ data.userName }}</strong></p>

      <!-- Новий логін з перевіркою доступності -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Новий логін</mat-label>
        <input
          matInput
          [(ngModel)]="model.newUserName"
          required
          (ngModelChange)="onUserNameChange($event)"
        />
        @if (checkingUserName) {
          <mat-spinner matSuffix diameter="18"></mat-spinner>
        } @else if (userNameError) {
          <mat-icon matSuffix color="warn" [matTooltip]="userNameError">error</mat-icon>
        } @else if (model.newUserName && userNameAvailable) {
          <mat-icon matSuffix class="icon-success" matTooltip="Логін доступний"
            >check_circle</mat-icon
          >
        }
        @if (userNameError) {
          <mat-error>{{ userNameError }}</mat-error>
        }
      </mat-form-field>

      @if(!data.adminChange) {
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Пароль користувача</mat-label>
        <input matInput type="password" [(ngModel)]="model.currentPassword" required />
        <mat-hint>Для підтвердження зміни логіну</mat-hint>
      </mat-form-field>
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
export class ChangeLoginDialogComponent implements OnInit, OnDestroy {
  private dialogRef = inject(MatDialogRef<ChangeLoginDialogComponent>);
  private usersService = inject(UsersService);
  data = inject<ChangeLoginDialogData>(MAT_DIALOG_DATA);

  model: ChangeUsernameDto = { currentPassword: '', newUserName: '' };

  // Validation state
  checkingUserName = false;
  userNameAvailable = false;
  userNameError = '';

  private readonly userNameSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Debounced username availability check
    this.userNameSubject
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => {
        if (!value || value.length < 3) {
          this.checkingUserName = false;
          this.userNameAvailable = false;
          this.userNameError = value ? 'Мінімум 3 символи' : '';
          return;
        }
        // Same as current — no need to check
        if (value === this.data.userName) {
          this.checkingUserName = false;
          this.userNameAvailable = false;
          this.userNameError = 'Новий логін співпадає з поточним';
          return;
        }
        this.checkingUserName = true;
        this.usersService.checkUsername(value, this.data.userId).subscribe({
          next: res => {
            this.checkingUserName = false;
            this.userNameAvailable = res.isAvailable;
            this.userNameError = res.isAvailable ? '' : res.message;
          },
          error: () => {
            this.checkingUserName = false;
            // Assume available on network error; backend will reject if taken
            this.userNameAvailable = true;
            this.userNameError = '';
          },
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onUserNameChange(value: string): void {
    this.userNameAvailable = false;
    this.userNameError = '';
    this.userNameSubject.next(value);
  }

  get canSave(): boolean {
    if (this.checkingUserName) return false; // Block while async check is in-flight
    const passwordOk = this.data.adminChange || !!this.model.currentPassword;
    return (
      !!this.model.newUserName &&
      this.userNameAvailable &&
      passwordOk
    );
  }

  save(): void {
    if (this.canSave) {
      this.dialogRef.close(this.model);
    }
  }
}
