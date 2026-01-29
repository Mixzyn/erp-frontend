import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SaleDetails } from '../../../models/sale-details';
import { SaleItemDetails } from '../../../models/sale-item-details';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-single-sale',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './single-sale.component.html',
  styleUrl: './single-sale.component.css',
})
export class SingleSaleComponent {
  private router = inject(Router);
  private productService = inject(ProductService);
  
  sale = input.required<SaleDetails>();

  date!: string;
  totalValue!: number;
  items: SaleItemDetails[] = [];
  imagePreview: string[] = [];

  ngOnInit() {
    const sale = this.sale();

    if (!sale) {
      this.router.navigateByUrl('vendas');
    }

    this.items = sale.items;
    this.date = sale.date;
    this.totalValue = sale.totalValue;

    this.imagePreview = sale.items.map(item => item.imagePath
      ? this.productService.getProductImage(item.imagePath)
      : 'img/products/sem-imagem.jpg'
    );
  }
}
