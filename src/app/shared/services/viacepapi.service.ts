import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  private baseUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {}

  getAdress(cep: string) {
    const url = `${this.baseUrl}${cep}/json`;
    return this.http.get(url);
  }
}
