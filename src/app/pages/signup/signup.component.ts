import { Component, inject } from '@angular/core';
import { LoginComponent } from '../../layout/login/login.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { formService } from '../../services/form.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  imports: [LoginComponent, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  formService = inject(formService);
  private router = inject(Router);
  private userService = inject(UserService);

  signupForm!: FormGroup;
  registerFailed: boolean = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    })
  }

  get username() { return this.signupForm.get('username'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value !== control.parent?.value.password) {
        return { mismatch: { value: control.value } }
      }

      return null;
    };
  }

  async onSubmit() {
    const addUser = await this.userService.addUser({ id: null, username: this.username!.value, password: this.password!.value });

    if (addUser) {
      this.router.navigateByUrl('login');
      return;
    }

    this.registerFailed = true;
  }
}
