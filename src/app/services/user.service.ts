import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:8080/";
  private readonly endpoint = "users";
  private readonly endpointIsAdmin = "verify-admin-auth";

  async register(body: any): Promise<boolean> {
    try {
      await lastValueFrom(this.http.post(this.apiUrl + this.endpoint, JSON.stringify(body)));
      return true;
    } catch {
      return false;
    }
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
