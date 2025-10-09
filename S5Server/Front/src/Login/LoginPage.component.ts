import { Component } from "@angular/core";
import { 
    ReactiveFormsModule,
    FormGroup, FormControl, Validators
} from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'page-login', standalone: true,
    template: `<h2>Вхід в систему</h2>
    <form [formGroup]="loginForm" >
        <mat-form-field>
            <mat-label>Ім'я користувача</mat-label>
            <input matInput formControlName="username" />
        </mat-form-field>
        <br />
        <mat-form-field>
            <mat-label>Пароль</mat-label>
            <input matInput formControlName="password" type="password" />
        </mat-form-field>
        <br />
        <button type="submit" [disabled]="loginForm.invalid">Увійти</button>
    </form>`,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    styles: [``]
})
export class LoginPage {
    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    })
}
