import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Login, Usuario } from 'src/app/shared/models';

const LS_CHAVE: string = 'usuarioLogado';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}

  public get usuarioLogado(): Usuario {
    let usu = localStorage[LS_CHAVE];
    return usu ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  login(login: Login): Observable<Usuario | null> {
    let usu = new Usuario(1, 'Razer-User', login.login, login.senha, 'USER');
    if (login.login == login.senha) {
      if (login.login == 'admin') {
        usu = new Usuario(1, 'Razer-Admin', login.login, login.senha, 'ADMIN');
      }
      return of(usu);
    } else {
      return of(null);
    }
  }
}
