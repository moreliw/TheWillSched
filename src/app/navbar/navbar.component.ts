import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeRoute: string = '/';
  isThemeDarkEnabled = true;
  isToggleSidebar = false;
  @Output() toggleSidebarChange = new EventEmitter<boolean>();
  
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit() {
    this.theme();
  }

  theme(): any {
    const toggler = document.getElementById('theme-toggle');

    if (this.isThemeDarkEnabled) {
      toggler?.addEventListener('change', function () {
        document.body.classList.add('dark');
      }
    )}
    else {
      toggler?.addEventListener('change', function () {
        document.body.classList.remove('dark');
      }
    )
    };
  }

  toggleSidebar(): void {
    this.toggleSidebarChange.emit(!this.isToggleSidebar);
  }
 }
