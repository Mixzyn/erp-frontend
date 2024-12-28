import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:8080/"
  private readonly TOKEN_KEY = "authToken";

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  async isAuthenticated(): Promise<boolean> {
    const token: string | null = this.getToken();

    if (token) {
      try {
        await lastValueFrom(this.http.get(this.apiUrl + "pacientes"));
        return true;
      } catch {
        return false;
      }
    }

    return false;
  }

}
