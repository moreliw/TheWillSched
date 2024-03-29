import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './auth/services/login.service';
import { Usuario } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TheWillStock';
  isThemeDarkEnabled: boolean = true;
  public isToggleSidebar: any;

  constructor(private router: Router, private loginService: LoginService) {}

  get usuarioLogado(): Usuario | null {
    return this.loginService.usuarioLogado;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.theme();
    const sideLinks = document.querySelectorAll(
      '.sidebar .side-menu li a:not(.logout)'
    );

    sideLinks.forEach((item) => {
      const li: HTMLElement | null = item.parentElement;
      item.addEventListener('click', () => {
        sideLinks.forEach((i) => {
          if (i.parentElement !== null) {
            i.parentElement.classList.remove('active');
          }
        });
        if (li !== null) {
          li.classList.add('active');
        }
      });
    });

    const menuBar: Element | null = document.querySelector(
      '.content nav .bx.bx-menu'
    );
    const sideBar: Element | null = document.querySelector('.sidebar');

    if (menuBar !== null) {
      menuBar.addEventListener('click', () => {
        if (sideBar !== null) {
          sideBar.classList.toggle('close');
        }
      });
    }

    const searchBtn = document.querySelector(
      '.content nav form .form-input button'
    );
    const searchBtnIcon = document.querySelector(
      '.content nav form .form-input button .bx'
    );
    const searchForm = document.querySelector('.content nav form');

    if (searchBtn !== null) {
      searchBtn.addEventListener('click', function (e) {
        if (window.innerWidth < 576) {
          e.preventDefault;
          if (searchForm !== null) {
            searchForm.classList.toggle('show');
            if (searchForm.classList.contains('show')) {
              if (searchBtnIcon !== null) {
                searchBtnIcon.classList.replace('bx-search', 'bx-x');
              }
            } else if (searchBtnIcon !== null) {
              searchBtnIcon.classList.replace('bx-x', 'bx-search');
            }
          }
        }
      });
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 768 && sideBar !== null) {
        sideBar.classList.add('close');
      } else if (sideBar !== null) {
        sideBar.classList.remove('close');
      }
      if (window.innerWidth > 576 && searchBtnIcon !== null) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        if (searchForm !== null) {
          searchForm.classList.remove('show');
        }
      }
    });
  }

  theme(): any {
    const toggler = document.getElementById('theme-toggle');

    if (this.isThemeDarkEnabled) {
      toggler?.addEventListener('change', function () {
        document.body.classList.add('dark');
      });
    } else {
      toggler?.addEventListener('change', function () {
        document.body.classList.remove('dark');
      });
    }
  }

  toggleSidebar(nac: boolean): boolean {
    console.log(nac);
    console.log(!this.isToggleSidebar);
    
    return this.isToggleSidebar;
  }
}
