import { Component, inject } from '@angular/core';
import { LoginComponent } from "../../layout/login/login.component";
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { formService } from '../../services/form.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signin',
  imports: [LoginComponent, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  formService = inject(formService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl: string = "http://localhost:8080/auth/login";
  loginFailed: boolean = false;

  signinForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  })

  get username() { return this.signinForm.get('username'); }
  get password() { return this.signinForm.get('password'); }

  onSubmit() {
    const login: string = this.username!.value;
    const password: string = this.password!.value;

    this.http.post(this.apiUrl, JSON.stringify({ login: login, password: password })).subscribe({
      next: (res: any) => {
        localStorage.setItem("authToken", res.token);
        this.router.navigateByUrl("home");
      },
      error: (err) => {
        console.log(JSON.stringify({ login: login, password: password }));
        this.loginFailed = true;
        console.error(err);
      }
    });
  }
}
