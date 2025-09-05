import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatMenuModule, MatButtonModule],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  protected readonly title = signal('Menu');
}
