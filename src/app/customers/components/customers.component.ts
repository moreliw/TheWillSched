import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customers.component.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersFormComponent } from '../form/customers-form/customers-form.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  produtos: any[] = [];
  customers: any[] | undefined;
  loading = false;

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  pageSize = 5;
  currentPage = 1;

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
  }

  openModal(): void {
    const modal = this.modalService.open(CustomersFormComponent, {
      size: 'lg',
    });

    modal.result
      .then((result) => {
        if (result) {
          this.loadCustomers();
        }
      })
      .catch(() => {});
  }

  openEditModal(cliente: any) {
    const modal = this.modalService.open(CustomersFormComponent, {
      size: 'lg',
    });
    modal.componentInstance.data = {
      cliente,
    };
    modal.componentInstance.isEdit = true;

    modal.result
      .then((result) => {
        if (result) {
          this.loadCustomers();
        }
      })
      .catch(() => {});
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

    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
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
