import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NavigatorComponent } from '../navigator/navigator.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatMenuModule, MatButtonModule, NavigatorComponent],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  protected readonly title = signal('Menu');
}
