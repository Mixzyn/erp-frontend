import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/';
  private readonly endpoint = 'users';
  private readonly endpointIsAdmin = 'verify-admin-auth';

  async addUser(user: User): Promise<boolean> {
    try {
      await lastValueFrom(this.http.post(this.apiUrl + this.endpoint, JSON.stringify(user)));
      return true;
    } catch {
      return false;
    }
  }

  async editUser(user: User): Promise<boolean> {
    try {
      await lastValueFrom(
        this.http.put(this.apiUrl + this.endpoint + '/' + user.id, JSON.stringify(user))
      );
      return true;
    } catch {
      return false;
    }
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + this.endpoint)
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + this.endpoint + '/' + userId);
  }

  getUsersByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + this.endpoint + '/search?username=' + username);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + this.endpoint + '/' + userId);
  }

  async isAdmin(): Promise<boolean> {
    try {
      await lastValueFrom(this.http.get(this.apiUrl + this.endpointIsAdmin));
      return true;
    } catch {
      return false;
    }
  }
}
