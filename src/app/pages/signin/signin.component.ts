import { Component, inject } from '@angular/core';
import { LoginComponent } from "../../layout/login/login.component";
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formService } from '../../services/form.service';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  imports: [LoginComponent, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  formService = inject(formService);
  private router = inject(Router);
  private authService = inject(AuthService);
  loginFailed: boolean = false;

  signinForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  })

  get username() { return this.signinForm.get('username'); }
  get password() { return this.signinForm.get('password'); }

  async onSubmit() {
    const login = await this.authService.login({ username: this.username!.value, password: this.password!.value });

    if (login) {
      this.router.navigateByUrl("home");
      return;
    }

    this.loginFailed = true;
  }
}
