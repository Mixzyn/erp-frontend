import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Product } from '../models/product';

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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + this.endpoint);
  }

  getProduct(productId: String): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + this.endpoint + "/" + productId);
  }
}
