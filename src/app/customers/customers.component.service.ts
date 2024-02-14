import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { BaseModel } from '../models/base-model';
import { Customer } from '../models/customer';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/customer`;

  constructor(private http: HttpClient) {}

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, customer);
  }

  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getAll(param?: any): Observable<BaseModel<Customer>> {
    let params = new HttpParams();
    if (param) {
      params = params
        .set('Page', `${param.offset + 1}`)
        .set('PageSize', `${param.limit}`)
        .set('Active', `${param.ativo}`);
    }

    return this.http.get<BaseModel<Customer>>(`${this.apiUrl}`, {
      params,
    });
  }

  getById(id: string): Observable<BaseModel<Customer>> {
    return this.http.get<BaseModel<Customer>>(`${this.apiUrl}/getById/${id}`);
  }

  activateInactivate(id: number): Observable<BaseModel<Customer>> {
    const json = { id: id };
    return this.http.put<BaseModel<Customer>>(
      `${this.apiUrl}/stateChange/${id}`,
      json
    );
  }
}
