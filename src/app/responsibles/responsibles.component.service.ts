import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from '../models/base-model';
import { Responsible } from '../models/responsible';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResponsibleService {
  private apiUrl = `${environment.apiUrl}/responsible`;

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
    return this.http.get<BaseModel<Responsible>>(`${this.apiUrl}/${id}`);
  }

  addResponsible(responsible: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, responsible);
  }

  updateResponsible(id: number, responsible: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, responsible);
  }

  deleteResponsible(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
