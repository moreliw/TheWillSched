import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {
  private apiUrl = 'https://localhost:44321/api/agendamento';

  constructor(private http: HttpClient) { }

  getScheduling(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
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
