import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customers/customers.component.service';
import { ToastrService } from 'ngx-toastr';
import { SchedulingService } from '../scheduling/scheduling.component.service';
import { Scheduling } from '../models/scheduling';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public loading: boolean = false;
  public customers: number = 0;
  public schedulingCount: number = 0;
  scheduling: Scheduling[] = [];

  ngOnInit() {
    this.loadCustomers();
    this.loadScheduling();
  }

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private schedulingService: SchedulingService
  ) {}

  navigateToServicosPage(): void {
    this.router.navigate(['/servicos']);
  }

  goTo(path: string) {
    this.router.navigate(['/' + path]);
  }

  loadCustomers(): void {
    this.loading = true;

    this.customerService.getAll().subscribe({
      next: (customers: any) => {
        this.customers = customers.data.length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Erro ao carregar clientes.', 'Erro');
      },
    });
  }

  loadScheduling(): void {
    this.loading = true;

    this.schedulingService.getAll().subscribe({
      next: (customers: any) => {
        this.scheduling = customers.data;
        this.schedulingCount = this.scheduling.length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Erro ao carregar clientes.', 'Erro');
      },
    });
  }
}
