import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../auth/services/login.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() close: boolean = false;
  activeRoute: string = '/';

  constructor(private router: Router, private auth: AuthService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
