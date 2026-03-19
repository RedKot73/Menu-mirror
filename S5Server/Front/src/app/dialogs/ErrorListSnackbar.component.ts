import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-list-snackbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSnackBarModule, MatIconModule],
  template: `
    <div class="error-snackbar-container">
      <div class="error-header">
        <mat-icon color="warn">error_outline</mat-icon>
        <span class="error-title">Помилки збереження:</span>
      </div>

      <ul class="error-list">
        @for (error of data; track $index) {
          <li>{{ error }}</li>
        } @empty {
          <li>Невідома помилка</li>
        }
      </ul>

      <div class="error-actions">
        <button mat-button (click)="snackBarRef.dismissWithAction()">Закрити</button>
      </div>
    </div>
  `,
  styles: [
    `
      .error-snackbar-container {
        color: white;
      }
      .error-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        font-weight: bold;
      }
      .error-list {
        margin: 0;
        padding-left: 24px;
        max-height: 200px;
        overflow-y: auto;
        font-size: 13px;
      }
      .error-list li {
        margin-bottom: 4px;
      }
      .error-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
      }
      .error-title {
        color: #ffab40;
      }
    `,
  ],
})
export class ErrorListSnackBarComponent {
  // Вместо конструктора
  public snackBarRef = inject(MatSnackBarRef<ErrorListSnackBarComponent>);
  public data = inject<string[]>(MAT_SNACK_BAR_DATA);
}