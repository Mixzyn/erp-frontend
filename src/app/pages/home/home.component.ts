import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly userService = inject(UserService);
  userIsAdmin: boolean = false;

  constructor() {
    this.verifyUserAdmin();
  }

  async verifyUserAdmin(): Promise<void> {
    const isAdmin = await this.userService.isAdmin();

    if (isAdmin) {
      this.userIsAdmin = true;
    }

    return;
  }
}
