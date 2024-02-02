import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { BaseModel } from '../models/base-model';
import { Responsible } from '../models/responsible';

@Injectable({
  providedIn: 'root',
})
export class ResponsibleService {
  private apiUrl = 'https://localhost:44321/api/responsible';

  constructor(private http: HttpClient) {}

  getAll(param?: any): Observable<BaseModel<Responsible>> {
    let params = new HttpParams();
    if (param) {
      params = params
        .set('Page', `${param.offset + 1}`)
        .set('PageSize', `${param.limit}`)
        .set('Active', `${param.ativo}`);
    }

    return this.http.get<BaseModel<Responsible>>(`${this.apiUrl}`, {
      params,
    });
  }

  getById(id: string): Observable<BaseModel<Responsible>> {
    return this.http.get<BaseModel<Responsible>>(
      `${this.apiUrl}/getById/${id}`
    );
  }
}
