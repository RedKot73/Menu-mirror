import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Переиспользуемый компонент для вертикальной разметки
 * Action Panel (Header/Buttons) + Content Panel + Bottom Panel (Pagination/Info)
 */
@Component({
  selector: 'app-vertical-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vertical-layout-container">
      <!-- Action Panel (Top) -->
      <div class="panel action-panel">
        <ng-content select="[actionPanel]"></ng-content>
      </div>

      <!-- Content Panel (Main) -->
      <div class="panel content-panel">
        <ng-content select="[contentPanel]"></ng-content>
      </div>

      <!-- Bottom Panel -->
      <div class="panel bottom-panel">
        <ng-content select="[bottomPanel]"></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .vertical-layout-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .action-panel {
        flex: 0 0 auto;
        background: #fafafa;
        border-bottom: 1px solid #e0e0e0;
        padding: 8px;
      }

      .content-panel {
        flex: 1 1 auto;
        overflow: auto;
        background: white;
        padding: 8px;
        min-height: 0;
      }

      .bottom-panel {
        flex: 0 0 auto;
        background: #fafafa;
        border-top: 1px solid #e0e0e0;
      }
    `,
  ],
})
export class VerticalLayoutComponent {}
