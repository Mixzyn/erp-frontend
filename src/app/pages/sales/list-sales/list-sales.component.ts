import { Component, inject } from '@angular/core';
import { SaleSummary } from '../../../models/sale-summary';
import { ListComponent } from '../../../layout/list/list.component';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-list-sales',
  imports: [ListComponent, RouterLink, DecimalPipe],
  templateUrl: './list-sales.component.html',
  styleUrl: './list-sales.component.css',
})
export class ListSalesComponent {
  private saleService = inject(SaleService);
  sales: SaleSummary[] = [];

  constructor() {
    this.getSales();
  }

  private getSales(): void {
    this.saleService.getSales().subscribe(sales => this.sales = sales);
  }

  deleteSale(): void {
    console.log('hm');
  }
  
  onSearch(valor: string): void {
    console.log('hm');
  }

  pressDeleteIcon(saleId: number): void {
    console.log('hm');
  }
}
