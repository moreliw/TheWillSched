import { Component, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Login } from 'src/app/shared/models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  @ViewChild('formLogin') formLogin!: NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    if (this.loginService.usuarioLogado) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin() {
    if (this.formLogin.valid) {
      this.auth.login(this.formLogin.value).subscribe({
        next: (result) => {
          alert(result.message);
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
    }
  }

  logIn() {
    this.router.navigate(['/login']);
  }
}
