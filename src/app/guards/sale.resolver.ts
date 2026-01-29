import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SaleService } from '../services/sale.service';
import { SaleDetails } from '../models/sale-details';

export const saleResolver: ResolveFn<SaleDetails> = (route) => {
  const service = inject(SaleService);
  const saleId = route.paramMap.get('id')!;
  return service.getSale(saleId);
};
