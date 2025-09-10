import { Component, input } from '@angular/core';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-single-product',
  imports: [],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
  product = input.required<Product>();
}
