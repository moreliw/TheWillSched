import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/user`;
  constructor(private http: HttpClient, private router: Router) {}

  criarNovaConta(userObj: any) {
    return this.http.post<any>(`${this.apiUrl}register`, userObj);
  }

  login(userObj: any) {
    return this.http.post<any>(`${this.apiUrl}authenticate`, userObj);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
