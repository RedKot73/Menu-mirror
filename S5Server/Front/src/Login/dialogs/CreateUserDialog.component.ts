import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CreateUserDto, UsersService, PasswordRequirements } from '../../app/auth/users.service';
import { SoldierSelectDialogComponent } from '../../app/dialogs/SoldierSelect-dialog.component';
import { SoldierDto } from '../../ServerService/soldier.service';
import { SoldierUtils } from '../../app/Soldier/soldier.utils';
import { LookupDto } from '../../app/shared/models/lookup.models';

export interface CreateUserDialogData {
  roles: LookupDto[];
}

@Component({
  selector: 'app-create-user-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  template: `
    <h2 mat-dialog-title>Створити користувача</h2>
    <form #form="ngForm" (ngSubmit)="save(form)">
      <mat-dialog-content class="dialog-content">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Військовослужбовець</mat-label>
          <input matInput [value]="soldierDisplay" readonly required name="soldierDisplay" />
          <button
            type="button"
            mat-icon-button
            matSuffix
            color="primary"
            (click)="openSoldierSelect()"
            matTooltip="Вибрати"
          >
            <mat-icon>person_search</mat-icon>
          </button>
          <mat-error>Військовослужбовець обов'язковий</mat-error>
        </mat-form-field>

        <!-- Логін з перевіркою доступності -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Логін</mat-label>
          <input
            matInput
            [(ngModel)]="model.userName"
            name="userName"
            required
            (ngModelChange)="onUserNameChange($event)"
          />
          @if (checkingUserName) {
            <mat-spinner matSuffix diameter="18"></mat-spinner>
          } @else if (userNameError) {
            <mat-icon matSuffix color="warn" [matTooltip]="userNameError">error</mat-icon>
          } @else if (model.userName && userNameAvailable) {
            <mat-icon matSuffix class="icon-success" matTooltip="Логін доступний"
              >check_circle</mat-icon
            >
          }
          @if (userNameError) {
            <mat-error>{{ userNameError }}</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput type="email" [(ngModel)]="model.email" name="email" />
        </mat-form-field>

        <!-- Пароль з перевіркою вимог -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Пароль</mat-label>
          <input
            matInput
            type="password"
            [(ngModel)]="model.password"
            name="password"
            required
            (ngModelChange)="onPasswordChange($event)"
          />
          @if (checkingPassword) {
            <mat-spinner matSuffix diameter="18"></mat-spinner>
          } @else if (passwordErrors.length) {
            <mat-icon matSuffix color="warn" [matTooltip]="passwordErrors.join('\\n')"
              >error</mat-icon
            >
          } @else if (model.password && passwordValid) {
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
          <input matInput type="password" [(ngModel)]="confirmPassword" name="confirmPassword" required />
        </mat-form-field>

        @if (passwordMismatch) {
          <p class="error-text">Паролі не збігаються</p>
        }

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Роль</mat-label>
          <mat-select [(ngModel)]="selectedRole" name="selectedRole" required placeholder="Оберіть роль...">
            @for (role of data.roles; track role.id) {
              <mat-option [value]="role.value">{{ role.value }}</mat-option>
            }
          </mat-select>
          <mat-error>Роль обов'язкова</mat-error>
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button type="button" mat-dialog-close>Скасувати</button>
        <button mat-flat-button type="submit" color="primary" [disabled]="!canSave || form.invalid">
          Створити
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styleUrls: ['./dialog-shared.scss'],
  styles: [
    `
      .dialog-content {
        min-width: 360px;
      }
    `,
  ],
})
export class CreateUserDialogComponent implements OnInit, OnDestroy {
  private dialogRef = inject(MatDialogRef<CreateUserDialogComponent>);
  private dialog = inject(MatDialog);
  private usersService = inject(UsersService);
  private snackBar = inject(MatSnackBar);
  data = inject<CreateUserDialogData>(MAT_DIALOG_DATA);

  model: CreateUserDto = {
    userName: '',
    password: '',
    soldierId: ''
  };

  selectedSoldier: SoldierDto | null = null;
  selectedRole = '';
  confirmPassword = '';

  // Validation state
  checkingUserName = false;
  userNameAvailable = false;
  userNameError = '';

  checkingPassword = false;
  passwordValid = false;
  passwordErrors: string[] = [];
  passwordHints = '';

  private readonly userNameSubject = new Subject<string>();
  private readonly passwordSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Load password requirements for hints
    this.usersService.getPasswordRequirements().subscribe((req) => {
      this.passwordHints = this.buildRequirementsHint(req);
    });

    // Debounced username check
    this.userNameSubject
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        if (!value || value.length < 3) {
          this.checkingUserName = false;
          this.userNameAvailable = false;
          this.userNameError = value ? 'Мінімум 3 символи' : '';
          return;
        }
        this.checkingUserName = true;
        this.usersService.checkUsername(value).subscribe({
          next: (res) => {
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
        this.usersService.validatePassword(value, this.model.userName).subscribe({
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

  onUserNameChange(value: string): void {
    this.userNameAvailable = false;
    this.userNameError = '';
    this.userNameSubject.next(value);
  }

  onPasswordChange(value: string): void {
    this.passwordValid = false;
    this.passwordErrors = [];
    this.passwordSubject.next(value);
  }

  get soldierDisplay(): string {
    if (!this.selectedSoldier) {
      return '';
    }
    const s = this.selectedSoldier;
    const rank = s.rankShortValue ? s.rankShortValue + ' ' : '';
    return `${rank}${this.formatFIO(s)} (${s.unitShortName ?? '—'})`;
  }

  openSoldierSelect(): void {
    const dialogRef = this.dialog.open(SoldierSelectDialogComponent, {
      width: '1000px',
      maxWidth: '96vw',
      maxHeight: '90vh',
      data: { excludeHasUser: true }
    });
    dialogRef.afterClosed().subscribe((soldier: SoldierDto | undefined) => {
      if (soldier) {
        this.selectedSoldier = soldier;
        this.model.soldierId = soldier.id;
        if (!this.model.userName && soldier.nickName) {
          this.model.userName = soldier.nickName;
          this.onUserNameChange(soldier.nickName);
        }
      }
    });
  }

  get passwordMismatch(): boolean {
    return !!this.confirmPassword && this.model.password !== this.confirmPassword;
  }

  get canSave(): boolean {
    if (this.checkingUserName || this.checkingPassword) return false; // Block during async checks
    return (
      !!this.model.userName &&
      this.userNameAvailable &&
      !!this.model.password &&
      this.passwordValid &&
      this.model.password === this.confirmPassword &&
      !!this.model.soldierId && // Обязательный выбор солдата
      !!this.selectedRole // Обязательная роль
    );
  }

  save(form: any): void {
    if (this.canSave && form.valid) {
      if (this.selectedRole) {
        this.model.roles = [this.selectedRole];
      }

      console.log(`[USER_MGMT] Creating user '${this.model.userName}' for soldier '${this.model.soldierId}'...`);

      this.usersService.create(this.model).subscribe({
        next: (result) => {
          console.log(`[USER_MGMT] Success: user '${this.model.userName}' created with role '${this.selectedRole}'.`);
          this.dialogRef.close(result);
        },
        error: (err: any) => {
          const errorMessage = err.error?.detail || err.message || 'Помилка сервера';
          console.error(`[USER_MGMT] Failed to create user '${this.model.userName}':`, errorMessage);
          this.snackBar.open(errorMessage, 'OK', { duration: 5000 });
        }
      });
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

  formatFIO(item: SoldierDto): string {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
}
