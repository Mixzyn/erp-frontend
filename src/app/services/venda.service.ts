import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Venda } from '../models/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:8080/"
  private readonly endpoint = "vendas"

  addVenda(venda: Venda) {
    this.http.post(this.apiUrl + this.endpoint, JSON.stringify(venda));
  }
}
