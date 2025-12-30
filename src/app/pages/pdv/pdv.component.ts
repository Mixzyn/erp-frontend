import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { VendaService } from '../../services/venda.service';
import { Venda } from '../../models/venda';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { createStaticPix, hasError } from 'pix-utils';
import { Router } from '@angular/router';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { isTauri } from '@tauri-apps/api/core';

@Component({
  selector: 'app-pdv',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './pdv.component.html',
  styleUrl: './pdv.component.css'
})
export class PdvComponent {
  private productService = inject(ProductService);
  private vendaService = inject(VendaService);
  private router = inject(Router);

  products: Product[] = [];
  venda: Venda = { itens: [] };
  searchProducts: Product[] = [];

  @ViewChild('inputCodigo') inputCodigo!: ElementRef<HTMLInputElement>;
  @ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>;
  @ViewChild('inputQuantidade') inputQuantidade!: ElementRef<HTMLInputElement>;
  @ViewChild('inputTotalRecebido') inputTotalRecebido!: ElementRef<HTMLInputElement>;
  @ViewChild('searchProductModal') searchProductModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;

  codigo: string = '';
  descricao: string = 'CAIXA ABERTO';
  quantidade: number | null = 1;
  valorUnitario: number = 0;
  totalItem: number = 0;
  imagePreview: string = 'img/products/sem-imagem.jpg';
  subTotal: number = 0;
  totalRecebido: number | null = null;
  troco: number = 0;
  search!: string;
  private searchTerms = new Subject<string>();
  selectedIndex: number = 0;

  constructor() {
    this.searchTerms.pipe(
      debounceTime(300),          // espera 300ms depois da última tecla
      distinctUntilChanged(),      // ignora se o valor não mudou
      switchMap(term => this.productService.getProductsByDescription(term))
    ).subscribe(produtos => this.searchProducts = produtos);
  }

  ngAfterViewInit() {
    this.inputCodigo.nativeElement.focus();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault();

      // out modal
      this.codigo = '';
      this.inputCodigo.nativeElement.focus();
    }

    if (event.key === 'F2') {
      event.preventDefault();

      // out modal
      this.quantidade = null;
      this.inputQuantidade.nativeElement.focus();
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      // in delete modal
      const modalInstance2 = Modal.getInstance(this.deleteModal.nativeElement);
      if (modalInstance2) {
        this.removeItem();
        this.closeModal();

        return;
      }

      // in search products modal
      const modalInstance1 = Modal.getInstance(this.searchProductModal.nativeElement);
      if (modalInstance1) {
        this.copySelectedValue();
        this.closeModal();
        this.search = '';
        this.searchProducts = [];
      }

      // out modal
      if (!this.quantidade || this.quantidade < 1) {
        this.quantidade = 1;
      }

      this.consultItem(this.codigo);

      if (this.totalRecebido && this.totalRecebido >= this.subTotal && this.subTotal > 0) {
        this.troco = this.totalRecebido - this.subTotal;
      }
    }

    if (event.key === 'F3') {
      event.preventDefault();

      // out modal
      if (!this.quantidade || this.quantidade < 1) {
        this.quantidade = 1;
      }

      if (this.codigo && this.codigo.length > 0) {
        this.addItem(this.codigo, Number(this.quantidade));
        this.subTotal += this.totalItem;
        this.clearInputs();
      }
    }

    if (event.key === 'F4') {
      event.preventDefault();

      // out modal
      this.openSearchProductModal();

      // in modal
      this.search = '';
      this.inputSearch.nativeElement.focus();
      this.productService.getProducts().subscribe(products => this.searchProducts = products);
    }

    if (event.key === 'F6') {
      event.preventDefault();

      // out modal
      if (this.subTotal > 0) {
        this.totalRecebido = null;
        this.inputTotalRecebido.nativeElement.focus();
      }
    }

    if (event.key === 'F7') {
      event.preventDefault();

      // out modal
      if (this.subTotal > 0) {
        this.generatePix();
      }
    }

    if (event.key === 'F8') {
      event.preventDefault();

      // out modal
      this.submitVenda();
      this.clearPdv();
    }

    if (event.key === 'Delete') {
      event.preventDefault();

      // out modal
      this.openDeleteModal();
    }

    if (event.key === 'Escape') {
      event.preventDefault();

      // out modal
      this.closeModal();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const modalInstance1 = Modal.getInstance(this.searchProductModal.nativeElement);
      const modalInstance2 = Modal.getInstance(this.deleteModal.nativeElement);

      if (modalInstance2) {
        return;
      }

      if (modalInstance1) {
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.searchProducts.length - 1);
      } else {
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.products.length - 1);
      }
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      const modalInstance = Modal.getInstance(this.deleteModal.nativeElement);
      if (modalInstance) {
        return;
      }

      this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    }
  }

  private addItem(codigo: string, quantidade: number): void {
    this.productService.getProductByCode(codigo).subscribe({
      next: (product) => {
        if (product) {
          this.products.push(product);
          this.venda.itens.push({ idProduto: product.id!, quantidade: quantidade });
        } else {
          console.warn('Produto não encontrado');
        }
      },
      error: (err) => {
        console.error('Erro ao buscar produto:', err);
      }
    });
  }

  public removeItem() {
    const totalItem = this.products[this.selectedIndex].precoUnitario * this.venda.itens[this.selectedIndex].quantidade

    this.products.splice(this.selectedIndex, 1);
    this.venda.itens.splice(this.selectedIndex, 1);

    this.subTotal -= totalItem;
  }

  private consultItem(codigo: string): void {
    if (codigo && codigo.length > 0) {
      this.productService.getProductByCode(codigo).subscribe({
        next: (product) => {
          this.descricao = product.descricao;
          this.valorUnitario = product.precoUnitario;
          this.totalItem = product.precoUnitario * this.quantidade!;

          if (product.imagePath) {
            this.imagePreview = this.productService.getProductImage(product.imagePath);
          }
        },
      });
    }
  }

  private clearInputs() {
    this.codigo = '';
    this.descricao = 'CAIXA ABERTO';
    this.quantidade = 1;
    this.valorUnitario = 0;
    this.totalItem = 0;
    this.imagePreview = 'img/products/sem-imagem.jpg';
  }

  private clearPdv() {
    this.clearInputs();
    this.products = [];
    this.troco = 0;
    this.subTotal = 0;
    this.totalRecebido = 0;
  }

  private openSearchProductModal(): void {
    let modalInstance1 = Modal.getInstance(this.searchProductModal.nativeElement);
    let modalInstance2 = Modal.getInstance(this.deleteModal.nativeElement);

    if (modalInstance2) {
      return;
    }

    if (!modalInstance1) {
      modalInstance1 = new Modal(this.searchProductModal.nativeElement);
    }

    modalInstance1.show();
  }

  private openDeleteModal(): void {
    let modalInstance1 = Modal.getInstance(this.searchProductModal.nativeElement);
    let modalInstance2 = Modal.getInstance(this.deleteModal.nativeElement);

    if (modalInstance1) {
      return;
    }

    if (!modalInstance2) {
      modalInstance2 = new Modal(this.deleteModal.nativeElement);
    }

    modalInstance2.show();
  }

  private closeModal(): void {
    this.selectedIndex = 0;

    const modalInstance1 = Modal.getInstance(this.searchProductModal.nativeElement);
    const modalInstance2 = Modal.getInstance(this.deleteModal.nativeElement);

    if (modalInstance1) {
      modalInstance1.hide();
      modalInstance1.dispose();
    }

    if (modalInstance2) {
      modalInstance2.hide();
      modalInstance2.dispose();
    }
  }

  public onSearch(valor: string): void {
    this.searchTerms.next(valor);
  }

  private copySelectedValue(): void {
    if (this.searchProducts.length > 0) {
      const produto = this.searchProducts[this.selectedIndex];
      this.codigo = produto.codigo;
    }
  }

  private async submitVenda() {
    if (this.products.length === 0) return;

    try {
      await this.vendaService.addVenda(this.venda);
    } catch (error) {
      console.error('Erro ao salvar venda', error);
    }
  }

  private generatePix() {
    localStorage.removeItem('pixQrCode');

    const pix = createStaticPix({
      merchantName: 'Market ERP',
      merchantCity: 'São Paulo',
      pixKey: 'pixKey',
      infoAdicional: 'info',
      transactionAmount: this.subTotal,
    });

    if (!hasError(pix)) {
      pix.toImage().then((qrCode: string) => {
        localStorage.setItem('pixQrCode', qrCode);

        if (isTauri()) {
          new WebviewWindow('pix-window', {
            url: '/pix',
            width: 600,
            height: 600,
            title: 'Pagamento Pix',
            resizable: false
          });
        } else {
          const url = this.router.serializeUrl(this.router.createUrlTree(['/pix']));
          window.open(url, '_blank', 'width=600, height=600');
        }
      });
    }
  }
}
