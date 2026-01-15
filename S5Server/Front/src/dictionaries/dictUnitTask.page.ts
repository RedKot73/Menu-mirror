import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDetailLayoutComponent } from '../app/shared/components/MasterDetailLayout.component';
import { DictUnitTaskComponent } from './dictUnitTask.component';
import { DictUnitTaskItemsComponent } from './dictUnitTaskItems.component';
import { DictUnitTaskDto } from '../ServerService/dictUnitTasks.service';

@Component({
  selector: 'dict-unit-task-page',
  standalone: true,
  imports: [
    CommonModule,
    MasterDetailLayoutComponent,
    DictUnitTaskComponent,
    DictUnitTaskItemsComponent,
  ],
  templateUrl: './dictUnitTask.page.html',
  styleUrls: ['./dictUnitTask.page.scss'],
})
export class DictUnitTaskPage {
  selectedTask = signal<DictUnitTaskDto | null>(null);

  onTaskSelected(task: DictUnitTaskDto | null) {
    this.selectedTask.set(task);
  }
}
