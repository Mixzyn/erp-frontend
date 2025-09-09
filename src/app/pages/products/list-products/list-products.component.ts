import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../models/product';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-list-products',
  imports: [RouterLink],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  productService = inject(ProductService);
  products: Product[] = [];

  constructor() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
