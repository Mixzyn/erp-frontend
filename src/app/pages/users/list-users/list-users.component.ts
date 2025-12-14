import { Component, inject } from '@angular/core';
import { ListComponent } from '../../../layout/list/list.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-list-users',
  imports: [RouterLink, FormsModule, ListComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  private userService = inject(UserService);
  users: User[] = [];
  currentUserId?: string;
  inputSearch!: string;
  private searchTerms = new Subject<string>();

  constructor() {
    this.getUsers();

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.userService.getUsersByUsername(term)))
      .subscribe(usuarios => this.users = usuarios)
  }

  deleteUser() {
    this.userService.deleteUser(this.currentUserId!).subscribe({
      next: () => {
        this.clearTable();
        this.getUsers();
      }
    })
  }

  pressDeleteIcon(userId: string) {
    this.currentUserId = userId;
  }

  private clearTable() {
    this.users = [];
  }

  private getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  onSearch(valor: string): void {
    this.searchTerms.next(valor);
  }
}
