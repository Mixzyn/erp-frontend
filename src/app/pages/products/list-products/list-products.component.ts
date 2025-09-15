import { Component, inject, output } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-list-products',
  imports: [RouterLink],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  private productService = inject(ProductService);
  products: Product[] = [];
  currentProductId?: number;

  constructor() {
    this.getProducts();
  }

  deleteProduct() {
    this.productService.deleteProduct(this.currentProductId!).subscribe({
      next: () => {
        this.clearTable();
        this.getProducts();
      },
      error: (err) => console.error("Erro ao deletar produto:", err)
    });
  }

  pressDeleteIcon(productId: number) {
    this.currentProductId = productId;
  }

  private clearTable() {
    this.products = [];
  }

  private getProducts() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
