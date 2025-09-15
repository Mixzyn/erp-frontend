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
    const formData = new FormData();

    if (product.imagePath) {
      formData.append('imagePath', product.imagePath);
    }

    formData.append('descricao', product.descricao);
    formData.append('codigo', product.codigo);
    formData.append('precoUnitario', product.precoUnitario.toString());

    try {
      await lastValueFrom(
        this.http.post(this.apiUrl + this.endpoint, formData)
      );
      return true;
    } catch {
      return false;
    }
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + this.endpoint);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + this.endpoint + "/" + productId);
  }

  getProductImage(imagePath: string) {
    return this.apiUrl + imagePath;
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + this.endpoint + "/" + productId);
  }
}
