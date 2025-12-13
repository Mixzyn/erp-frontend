import { Component, inject, output } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router';
import { debounceTime, delay, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ListComponent } from '../../../layout/list/list.component';

@Component({
  selector: 'app-list-products',
  imports: [RouterLink, FormsModule, DecimalPipe, ListComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  private productService = inject(ProductService);
  products: Product[] = [];
  currentProductId?: number;
  inputSearch!: string;
  private searchTerms = new Subject<string>();

  constructor() {
    this.getProducts();

    this.searchTerms.pipe(
      debounceTime(300),          // espera 300ms depois da última tecla
      distinctUntilChanged(),      // ignora se o valor não mudou
      switchMap(term => this.productService.getProductsByDescription(term))
    ).subscribe(produtos => this.products = produtos);
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

  onSearch(valor: string): void {
    this.searchTerms.next(valor);
  }
}
