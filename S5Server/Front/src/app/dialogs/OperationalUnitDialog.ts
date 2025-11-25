import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { UnitDto } from '../Unit/services/unit.service';

@Component({
  selector: 'app-operational-unit-dialog',
  imports: [MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './OperationalUnitDialog.html',
  styleUrl: './OperationalUnitDialog.scss',
})
export class OperationalUnitDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UnitDto,
    private ref: MatDialogRef<OperationalUnitDialogComponent>
  ) {
    // Синхронізуємо name з shortName
    if (data.shortName) {
      data.name = data.shortName;
    }
  }

  onShortNameChange() {
    // Автоматично синхронізуємо name з shortName
    this.data.name = this.data.shortName || '';
  }

  onCancel() {
    this.ref.close();
  }

  onSave() {
    // Переконуємось що name = shortName перед збереженням
    this.data.name = this.data.shortName || '';
    this.ref.close(this.data);
  }
}
