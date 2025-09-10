import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-single-product',
  imports: [],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  product = computed(() => this.data().product as Product);
}
