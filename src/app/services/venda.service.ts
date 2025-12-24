import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Venda } from '../models/venda';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/';
  private readonly endpoint = 'vendas';

  async addVenda(venda: Venda): Promise<boolean> {
    console.log(JSON.stringify(venda));

    try {
      await lastValueFrom(
        this.http.post(this.apiUrl + this.endpoint, JSON.stringify(venda))
      );
      return true;
    } catch {
      return false;
    }
  }
}
