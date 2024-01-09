import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customers.component.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersFormComponent } from '../form/customers-form/customers-form.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Customer } from 'src/app/models/customer';
import { BaseModel } from 'src/app/models/base-model';
import { __param } from 'tslib';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  produtos: any[] = [];
  customers: Customer[] = [];
  loading = false;

  page = {
    limit: 10,
    count: 0,
    offset: 0,
    descricao: '',
    ativo: true,
  };

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  pageSize = 5;
  currentPage = 1;

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
  }

  newCustomer() {
    this.router.navigate(['./new'], { relativeTo: this.route });
  }

  editCustomer(customer: Customer) {
    this.router.navigate(['./edit/' + customer.id], { relativeTo: this.route });
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.toastr.warning('Cliente excluído com sucesso!', 'Sucesso');
        this.loadCustomers();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Erro ao excluir cliente', 'Não possível exluir');
      },
    });
  }

  openConfirmationModal(customerId: number) {
    const modalRef = this.modalService.open(ConfirmModalComponent);

    modalRef.result
      .then((result) => {
        if (result === 'confirm') {
          this.deleteCustomer(customerId);
        }
      })
      .catch(() => {});

    modalRef.componentInstance.message =
      'Tem certeza de que deseja excluir este cliente?';
  }

  loadCustomers(): void {
    this.loading = true;

    this.customerService.getAll(this.page).subscribe({
      next: (customers: BaseModel<Customer>) => {
        this.customers = customers.itens;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Erro ao carregar clientes.', 'Erro');
      },
    });
  }

  showSuccess() {
    this.toastr.success('everything is broken', 'Major Error', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
  }

  formatarNumeroTelefone(numero: number): string {
    return `(${numero.toString().substring(0, 2)}) ${numero
      .toString()
      .substring(2, 3)} ${numero.toString().substring(3, 7)}-${numero
      .toString()
      .substring(7)}`;
  }
}
