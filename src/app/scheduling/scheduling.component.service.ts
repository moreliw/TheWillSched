import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from '../models/base-model';
import { Scheduling } from '../models/scheduling';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchedulingService {
  private apiUrl = `${environment.apiUrl}/scheduling`;

  constructor(private http: HttpClient) {}

  getAll(param?: any): Observable<BaseModel<Scheduling>> {
    let params = new HttpParams();
    if (param) {
      params = params
        .set('Page', `${param.offset + 1}`)
        .set('PageSize', `${param.limit}`)
        .set('Active', `${param.ativo}`);
    }

    return this.http.get<BaseModel<Scheduling>>(`${this.apiUrl}`, {
      params,
    });
  }

  getById(id: string): Observable<BaseModel<Scheduling>> {
    return this.http.get<BaseModel<Scheduling>>(`${this.apiUrl}/getById/${id}`);
  }

  addScheduling(scheduling: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, scheduling);
  }

  updateScheduling(id: number, scheduling: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, scheduling);
  }

  deleteScheduling(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
