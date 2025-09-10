import { Component, inject, output } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-products',
  imports: [RouterLink],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  private productService = inject(ProductService);
  products: Product[] = [];

  constructor() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
