import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/';
  private readonly endpoint = 'produtos';

  async addProduct(product: Product): Promise<boolean> {
    if (product.imagePath) {
      const formData = new FormData();

      formData.append('imagePath', product.imagePath);
      formData.append('descricao', product.description);
      formData.append('codigo', product.code);
      formData.append('precoUnitario', product.unitPrice.toString().replace(',', '.'));

      try {
        await lastValueFrom(
          this.http.post(this.apiUrl + this.endpoint, formData)
        );
        return true;
      } catch {
        return false;
      }
    }

    const body = {
      id: product.id,
      descricao: product.description,
      codigo: product.code,
      precoUnitario: product.unitPrice
    }

    try {
      await lastValueFrom(
        this.http.post(this.apiUrl + this.endpoint, body)
      );
      return true;
    } catch {
      return false;
    }
  }

  async editProduct(product: Product): Promise<boolean> {
    if (product.imagePath) {
      const formData = new FormData();

      formData.append('imagePath', product.imagePath);

      if (product.description) {
        formData.append('descricao', product.description);
      }

      if (product.code) {
        formData.append('codigo', product.code);
      }

      if (product.unitPrice) {
        formData.append('precoUnitario', product.unitPrice.toString().replace(',', '.'));
      }

      try {
        await lastValueFrom(
          this.http.put(this.apiUrl + this.endpoint + '/' + product.id, formData)
        );
        return true;
      } catch {
        return false;
      }
    }

    const body = {
      id: product.id,
      descricao: product.description,
      codigo: product.code,
      precoUnitario: product.unitPrice
    }

    try {
      await lastValueFrom(
        this.http.put(this.apiUrl + this.endpoint + '/' + product.id, body)
      );
      return true;
    } catch {
      return false;
    }
  }

  /*   getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.apiUrl + this.endpoint);
    } */

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl + this.endpoint).pipe(
      map(products =>
        products.map(p => {
          return {
            id: p.id,
            description: p.descricao,
            code: p.codigo,
            unitPrice: p.precoUnitario,
            imagePath: p.imagePath
          } as Product;
        })
      )
    );
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<any>(this.apiUrl + this.endpoint + '/' + productId).pipe(
      map(product => {
        return {
          id: product.id,
          description: product.descricao,
          code: product.codigo,
          unitPrice: product.precoUnitario,
          imagePath: product.imagePath
        } as Product;
      }
      )
    );
  }

  getProductByCode(productCode: string): Observable<Product> {
    return this.http.get<any>(this.apiUrl + this.endpoint + '/codigo/' + productCode).pipe(
      map(product => {
        return {
          id: product.id,
          description: product.descricao,
          code: product.codigo,
          unitPrice: product.precoUnitario,
          imagePath: product.imagePath
        } as Product;
      }
      )
    );
  }

  getProductsByDescription(description: string): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl + this.endpoint + '/search?descricao=' + description).pipe(
      map(products =>
        products.map(p => {
          return {
            id: p.id,
            description: p.descricao,
            code: p.codigo,
            unitPrice: p.precoUnitario,
            imagePath: p.imagePath
          } as Product;
        })
      )
    );
  }

  getProductImage(imagePath: string) {
    return this.apiUrl + imagePath;
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + this.endpoint + '/' + productId);
  }
}
