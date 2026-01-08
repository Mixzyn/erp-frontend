import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SaleCreate } from '../models/sale-create';
import { lastValueFrom, map, Observable } from 'rxjs';
import { SaleSummary } from '../models/sale-summary';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/';
  private readonly endpoint = 'vendas';

  async addSale(venda: SaleCreate): Promise<boolean> {
    const items = venda.items.map(item => {
      return {
        idProduto: item.productId,
        quantidade: item.quantity
      }
    });

    try {
      await lastValueFrom(
        this.http.post(this.apiUrl + this.endpoint, {itens: items})
      );
      return true;
    } catch {
      return false;
    }
  }

  getSales(): Observable<SaleSummary[]> {
    return this.http.get<any[]>(this.apiUrl + this.endpoint + '/resumo').pipe(
      map(sales =>
        sales.map(s => {
          const d = new Date(s.data);

          return {
            id: s.id,
            date: d.toLocaleDateString('pt-BR'),
            time: d.toLocaleTimeString('pt-BR'),
            totalValue: s.valorTotal
          } as SaleSummary;
        })
      )
    );
  }
}
