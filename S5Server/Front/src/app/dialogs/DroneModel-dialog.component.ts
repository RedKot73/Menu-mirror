import { ChangeDetectionStrategy, Component, Inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { DictDroneModel } from '../../ServerService/dictDroneModel.service';
import { DictDroneTypeService } from '../../ServerService/dictDroneType.service';
import { LookupDto } from '../shared/models/lookup.models';

@Component({
  selector: 'app-drone-model-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./DialogShared.scss'],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Редагувати' : 'Створити новий' }}</h2>
    <div mat-dialog-content class="content">
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Тип БПЛА</mat-label>
        <mat-select [(ngModel)]="data.droneTypeId" required>
          @for (type of droneTypes(); track type.id) {
          <mat-option [value]="type.id">
            {{ type.value }}
          </mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Модель</mat-label>
        <input matInput [(ngModel)]="data.value" required />
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Коментар</mat-label>
        <input matInput [(ngModel)]="data.comment" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="onCancel()">Відміна</button>
      <button
        mat-raised-button
        color="primary"
        (click)="onSave()"
        [disabled]="!data.value.trim() || !data.droneTypeId"
      >
        Зберегти
      </button>
    </div>
  `,
})
export class DroneModelDialogComponent implements OnInit {
  droneTypes = signal<LookupDto[]>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DictDroneModel,
    private ref: MatDialogRef<DroneModelDialogComponent>,
    private droneTypeService: DictDroneTypeService
  ) {}

  ngOnInit() {
    this.droneTypeService.getSelectList().subscribe((types) => {
      this.droneTypes.set(types);
    });
  }

  onCancel() {
    this.ref.close();
  }
  onSave() {
    this.ref.close(this.data);
  }
}
