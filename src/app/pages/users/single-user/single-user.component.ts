import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { FormComponent } from '../../../layout/form/form.component';

@Component({
  selector: 'app-single-user',
  imports: [FormComponent, ReactiveFormsModule],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css'
})
export class SingleUserComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  user = input.required<User>();
  editUserForm!: FormGroup;
  imagePreview: string = 'img/products/sem-imagem.jpg';
  editUserFailed: boolean = false;

  constructor(private fb: FormBuilder) { }

  get username() { return this.editUserForm.get('username') }
  get password() { return this.editUserForm.get('password') }

  ngOnInit() {
    const user = this.user();

    if (!user) {
      this.router.navigateByUrl('admin/usuarios');
    }

    this.editUserForm = this.fb.group({
      username: [null],
      password: [null]
    })
  }

  async onSubmit() {
    const editUser = await this.userService.editUser({ id: this.user().id, username: this.username?.value, password: this.password?.value })

    if (editUser) {
      this.router.navigateByUrl('admin/usuarios')
    }
  }
}
