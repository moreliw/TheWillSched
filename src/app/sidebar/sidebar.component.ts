import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../auth/services/login.service';
import { AuthService } from '../shared/services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() close: boolean = false;
  activeRoute: string = '/';
  @Input() isToggleSidebar: boolean = false;

  constructor(
    private router: Router, 
    private auth: AuthService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }

  logout(): void {
    this.auth.logout();
  }

  toggleSidebar(): void {
    this.isToggleSidebar = !this.isToggleSidebar;
    console.log(this.isToggleSidebar)
  }
}
