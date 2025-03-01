import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:8080/"
  private readonly endpointLogin = "auth/login"
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

  async login(body: any): Promise<boolean> {
    this.removeToken();

    return true;

    // try {
    //   await lastValueFrom(this.http.post(this.apiUrl + this.endpointLogin, JSON.stringify(body)).pipe(
    //     map((res: any) => this.setToken(res.token))
    //   ));
    //   return true;
    // } catch {
    //   return false;
    // }
  }

  async isAuthenticated(): Promise<boolean> {

    return true;

  //   const token: string | null = this.getToken();

  //   if (token) {
  //     try {
  //       await lastValueFrom(this.http.get(this.apiUrl + "pacientes"));
  //       return true;
  //     } catch {
  //       return false;
  //     }
  //   }

  //   return false;
  }

}
