import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MasterDetailLayoutComponent } from '../app/shared/components/MasterDetailLayout.component';
import {
  UsersService,
  UserListItem,
  RoleDto,
} from '../app/auth/users.service';
import { CreateUserDialogComponent } from './dialogs/CreateUserDialog.component';
import { ChangePasswordDialogComponent } from './dialogs/ChangePasswordDialog.component';
import { ChangeLoginDialogComponent } from './dialogs/ChangeLoginDialog.component';
import { ConfirmDialogComponent } from '../app/dialogs/ConfirmDialog.component';

@Component({
  selector: 'app-users-page',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MasterDetailLayoutComponent,
  ],
  templateUrl: './Users.page.html',
  styleUrls: ['./Users.page.scss'],
})
export class UsersPage implements OnInit {
  private usersService = inject(UsersService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  readonly users = signal<UserListItem[]>([]);
  readonly selectedUser = signal<UserListItem | null>(null);
  readonly allRoles = signal<RoleDto[]>([]);
  readonly showInactive = signal(false);

  /** Ролі вибраного користувача */
  readonly userRoles = signal<string[]>([]);

  /** Ролі, які ще можна додати */
  readonly availableRoles = computed(() => {
    const assigned = new Set(this.userRoles());
    return this.allRoles().filter(r => !assigned.has(r.name!));
  });

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.usersService.getAll(this.showInactive()).subscribe({
      next: list => this.users.set(list),
      error: () => this.notify('Помилка завантаження користувачів'),
    });
  }

  selectUser(user: UserListItem): void {
    this.selectedUser.set(user);
  }

  // ── Roles ─────────────────────────────

  private loadRoles(): void {
    this.usersService.getAllRoles().subscribe({
      next: roles => this.allRoles.set(roles),
    });
  }

  private loadUserRoles(userId: string): void {
    this.usersService.getById(userId).subscribe({
      next: (detail: UserListItem) => {
        if (detail.roles) {
          this.userRoles.set(detail.roles);
        } else {
          this.userRoles.set([]);
        }
      },
    });
  }

  addRole(roleName: string): void {
    const userId = this.selectedUser()?.id;
    if (!userId || !roleName) {
      return;
    }

    this.usersService.addUserToRole(userId, roleName).subscribe({
      next: () => {
        this.userRoles.update(roles => [...roles, roleName]);
        this.notify(`Роль "${roleName}" додано`);
      },
      error: () => this.notify('Помилка додавання ролі'),
    });
  }

  removeRole(roleName: string): void {
    const userId = this.selectedUser()?.id;
    if (!userId) {
      return;
    }

    this.usersService.removeUserFromRole(userId, roleName).subscribe({
      next: () => {
        this.userRoles.update(roles => roles.filter(r => r !== roleName));
        this.notify(`Роль "${roleName}" видалено`);
      },
      error: () => this.notify('Помилка видалення ролі'),
    });
  }

  // ── Actions ───────────────────────────

  onCreateUser(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '480px',
      data: { roles: this.allRoles() },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.create(result).subscribe({
          next: () => {
            this.notify('Користувача створено');
            this.loadUsers();
          },
          error: err => {
            const msg = err.error?.detail || 'Помилка створення користувача';
            this.notify(msg);
          },
        });
      }
    });
  }

  onChangePassword(): void {
    const user = this.selectedUser();
    if (!user) {
      return;
    }

    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
      data: { userName: user.userName },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.changePassword(user.id, result).subscribe({
          next: () => this.notify('Пароль змінено'),
          error: err => {
            const msg = err.error?.detail || 'Помилка зміни пароля';
            this.notify(msg);
          },
        });
      }
    });
  }

  onChangeLogin(): void {
    const user = this.selectedUser();
    if (!user) {
      return;
    }

    const dialogRef = this.dialog.open(ChangeLoginDialogComponent, {
      width: '400px',
      data: { userId: user.id, userName: user.userName },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.changeUsername(user.id, result).subscribe({
          next: () => {
            this.notify('Логін змінено');
            this.loadUsers();
          },
          error: err => {
            const msg = err.error?.detail || 'Помилка зміни логіну';
            this.notify(msg);
          },
        });
      }
    });
  }

  onToggleLockout(lock: boolean): void {
    const user = this.selectedUser();
    if (!user) {
      return;
    }

    const action = lock ? 'заблокувати' : 'розблокувати';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: lock ? 'Блокування' : 'Розблокування',
        message: `Ви впевнені, що хочете ${action} користувача "${user.userName}"?`,
      },
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.usersService.setLockout(user.id, { lock }).subscribe({
          next: () => {
            this.notify(lock ? 'Користувача заблоковано' : 'Користувача розблоковано');
            this.selectUser(this.selectedUser()!);
            this.loadUsers();
          },
          error: () => this.notify('Помилка зміни статусу'),
        });
      }
    });
  }

  onDeleteUser(): void {
    const user = this.selectedUser();
    if (!user) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Видалення користувача',
        message: `Ви впевнені, що хочете видалити користувача "${user.userName}"? Цю дію неможливо скасувати.`,
        color: 'warn',
      },
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.usersService.delete(user.id).subscribe({
          next: () => {
            this.notify('Користувача видалено');
            this.selectedUser.set(null);
            this.loadUsers();
          },
          error: () => this.notify('Помилка видалення'),
        });
      }
    });
  }

  private notify(msg: string): void {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }
}
