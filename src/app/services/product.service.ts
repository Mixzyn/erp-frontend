import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:8080/"
  private readonly endpoint = "produtos"

  async addProduct(product: any): Promise<boolean> {
    try {
      await lastValueFrom(
        this.http.post(this.apiUrl + this.endpoint, JSON.stringify(product))
      );
      return true;
    } catch {
      return false;
    }
  }
}
