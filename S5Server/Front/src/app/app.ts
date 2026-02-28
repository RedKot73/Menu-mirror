import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NavigatorComponent } from '../navigator/navigator.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatMenuModule, MatButtonModule, NavigatorComponent],
  templateUrl: './app.html',
  styles: [],
})
export class App implements OnInit {
  protected readonly title = signal('Menu');
  private auth = inject(AuthService);

  ngOnInit(): void {
    // Перевірити сесію при завантаженні додатку (cookie вже може існувати)
    this.auth.checkSession().subscribe();
  }
}
