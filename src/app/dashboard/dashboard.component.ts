import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customers/customers.component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public loading: boolean = false;
  public customers: number = 0;

  ngOnInit() {
    this.loadCustomers();
  }

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {}

  navigateToServicosPage(): void {
    this.router.navigate(['/servicos']);
  }

  goTo(path: string) {
    this.router.navigate(['/' + path]);
  }

  loadCustomers(): void {
    this.loading = true;

    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers.length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Erro ao carregar clientes.', 'Erro');
      },
    });
  }
}
