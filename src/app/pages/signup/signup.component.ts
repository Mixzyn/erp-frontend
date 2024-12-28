import { Component, inject } from '@angular/core';
import { LoginComponent } from '../../layout/login/login.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { formService } from '../../services/form.service';

@Component({
  selector: 'app-signup',
  imports: [LoginComponent, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  formService = inject(formService);

  signupForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl<string>('', [Validators.required, this.confirmPasswordValidator()])
  })

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

  onSubmit() {

  }
}
