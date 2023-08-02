import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
  }

  constructor(
    private router: Router) {}

  navigateToServicosPage(): void {
    this.router.navigate(['/servicos']);
  }

  goTo(path: string){
    this.router.navigate(['/'+path]);
  }
}
