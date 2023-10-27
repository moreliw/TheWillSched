import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from 'src/app/shared/models';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;
  showPassword: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    if (this.loginService.usuarioLogado) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.message = params['error'];
    });
  }

  onLogin() {
    if (this.formLogin.valid) {
      this.loading = true;
      this.auth.login(this.formLogin.value).subscribe({
        next: (result) => {
          this.loginService.usuarioLogado = result;
          this.formLogin.reset();
          this.auth.storeToken(result.token);
          this.toastr.success('Login efetuado com sucesso!', 'Sucesso');
          this.router.navigate(['/dashboard']);
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error(
            'Usuário ou senha incorretos',
            'Não foi possível efetuar o login',
            error.message
          );
          this.loading = false;
        },
      });
    }
  }

  onSignUp() {
    this.router.navigate(['/signup']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
