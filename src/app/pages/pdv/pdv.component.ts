import { Component, ElementRef, HostListener, inject, input, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { VendaService } from '../../services/venda.service';
import { Venda } from '../../models/venda';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pdv',
  imports: [FormsModule],
  templateUrl: './pdv.component.html',
  styleUrl: './pdv.component.css'
})
export class PdvComponent {
  private productService = inject(ProductService);
  private vendaService = inject(VendaService);
  products: Product[] = [];
  venda: Venda = { itens: [] }

  @ViewChild('inputCodigo') inputCodigo!: ElementRef<HTMLInputElement>;
  @ViewChild('inputQuantidade') inputQuantidade!: ElementRef<HTMLInputElement>;
  codigo: string = '';
  quantidade: number | null = 1;
  valorUnitario: number = 0;
  totalItem: number = 0;
  imagePreview: string = "img/products/sem-imagem.jpg";

  // Captura global da tecla F1
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault(); // impede ação padrão do navegador
      this.codigo = '';
      this.inputCodigo.nativeElement.focus();
    }

    if (event.key === 'F2') {
      event.preventDefault();
      this.quantidade = null;
      this.inputQuantidade.nativeElement.focus();
    }

    if (event.key === 'Enter') {
      this.consultItem(this.codigo);
    }

    if (event.key === 'F3') {
      event.preventDefault();
      if (this.codigo && this.codigo.length > 0) {
        this.addItem(this.codigo, Number(this.quantidade));
        this.clearInputs();
      }
    }

    if (event.key === 'F4') {
      event.preventDefault();
      // this.submitVenda();
    }

  }

  private addItem(codigo: string, quantidade: number): void {
    this.productService.getProductByCode(codigo).subscribe({
      next: (product) => {
        if (product) {
          this.products.push(product);
          this.venda.itens.push({ productId: product.id!, quantidade: quantidade });
        } else {
          console.warn("Produto não encontrado");
        }
      },
      error: (err) => {
        console.error("Erro ao buscar produto:", err);
      }
    });
  }

  private consultItem(codigo: string): void {
    let consultProduct: Product;
    this.productService.getProductByCode(codigo).subscribe({
      next: (product) => {
        this.valorUnitario = product.precoUnitario;
        this.totalItem = product.precoUnitario * this.quantidade!;

        if (product.imagePath) {
          this.imagePreview = this.productService.getProductImage(product.imagePath);
        }

      },
    });
  }

  private clearInputs() {
    this.codigo = '';
    this.quantidade = 1;
    this.valorUnitario = 0;
    this.totalItem = 0;
    this.imagePreview = "img/products/sem-imagem.jpg";
  }

  /*   private submitVenda(): void {
      if (this.products.length > 0) {
        this.venda.itens.push(this.products);
        this.vendaService.addVenda();
      }
    } */

}
