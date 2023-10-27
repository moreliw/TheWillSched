import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
// export class AuthGuard implements CanActivate {
//   constructor(private loginService: LoginService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     const usuarioLogado = this.loginService.usuarioLogado;
//     let url = state.url;
//     if (usuarioLogado) {
//       if (
//         route.data?.['role'] &&
//         route.data?.['role'].indexOf(usuarioLogado.perfil) === -1
//       ) {
//         this.router.navigate(['/login'], {
//           queryParams: { error: 'Proibido o acesso a ' + url },
//         });

//         return false;
//       }

//       return true;
//     }

//     this.router.navigate(['/login'], {
//       queryParams: { error: 'Deve fazer o login antes de acessar ' + url },
//     });
//     return false;
//   }
// }
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toastr.error('Faça o login', '');
      this.router.navigate(['login']);
      return false;
    }
  }
}
