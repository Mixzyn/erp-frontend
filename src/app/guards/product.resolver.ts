import { ResolveFn } from '@angular/router';
import { Product } from '../models/product';
import { inject } from '@angular/core';
import { ProductService } from '../services/product.service';

export const productResolver: ResolveFn<Product> = (route) => {
  const service = inject(ProductService);
  const productId = route.paramMap.get('id')!;
  return service.getProduct(productId);
};
