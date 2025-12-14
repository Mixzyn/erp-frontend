import { Component, inject } from '@angular/core';
import { FormComponent } from '../../../layout/form/form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [FormComponent, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  imagePreview: string = "img/products/sem-imagem.jpg";
  addUserForm!: FormGroup;
  addUserFailed: boolean = false;

  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  get username() { return this.addUserForm.get('username') }
  get password() { return this.addUserForm.get('password') }

  async onSubmit() {
    const addUser = await this.userService.addUser({ id: null, username: this.username!.value, password: this.password!.value });

    if (addUser) {
      this.router.navigateByUrl("usuarios");
    }

    this.addUserFailed = true;
  }
}
