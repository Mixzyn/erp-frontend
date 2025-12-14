import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:8080/";
  private readonly endpoint = "produtos";

  async addProduct(product: Product): Promise<boolean> {
    if (product.imagePath) {
      const formData = new FormData();

      formData.append('imagePath', product.imagePath);
      formData.append('descricao', product.descricao);
      formData.append('codigo', product.codigo);
      formData.append('precoUnitario', product.precoUnitario.toString().replace(',', '.'));

      try {
        await lastValueFrom(
          this.http.post(this.apiUrl + this.endpoint, formData)
        );
        return true;
      } catch {
        return false;
      }
    }

    try {
      await lastValueFrom(
        this.http.post(this.apiUrl + this.endpoint, JSON.stringify(product))
      );
      console.log("FUNFOUFAOFUWOUFA");
      return true;
    } catch {
      return false;
    }
  }

  async editProduct(product: Product): Promise<boolean> {
    if (product.imagePath) {
      const formData = new FormData();

      formData.append('imagePath', product.imagePath);

      if (product.descricao) {
        formData.append('descricao', product.descricao);
      }
      if (product.codigo) {
        formData.append('codigo', product.codigo);
      }

      if (product.precoUnitario) {
        formData.append('precoUnitario', product.precoUnitario.toString().replace(',', '.'));
      }

      try {
        await lastValueFrom(
          this.http.put(this.apiUrl + this.endpoint + "/" + product.id, formData)
        );
        return true;
      } catch {
        return false;
      }
    }

    try {
      await lastValueFrom(
        this.http.put(this.apiUrl + this.endpoint + "/" + product.id, JSON.stringify(product))
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

  getProductByCode(productCode: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + this.endpoint + "/codigo/" + productCode);
  }

  getProductsByDescription(description: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + this.endpoint + "/search?descricao=" + description);
  }

  getProductImage(imagePath: string) {
    return this.apiUrl + imagePath;
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + this.endpoint + "/" + productId);
  }
}
