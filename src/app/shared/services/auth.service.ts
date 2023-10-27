import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:44321/api/User/';
  constructor(private http: HttpClient, private router: Router) {}

  criarNovaConta(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, userObj);
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
