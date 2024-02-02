import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SchedulingService } from '../../scheduling.component.service';
import { CustomerService } from 'src/app/customers/customers.component.service';
import { ActivatedRoute } from '@angular/router';
import { Scheduling } from 'src/app/models/scheduling';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-scheduling-form',
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss'],
})
export class SchedulingFormComponent implements OnInit {
  @Input() data: any;
  @Input() isEdit = false;

  id: any;

  title = 'Agendar';
  buttonTitle = 'CADASTRAR';
  public shcedulingForm: FormGroup;
  public loading = false;

  scheduling: Scheduling;
  customers: Customer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private schedulingService: SchedulingService,
    private toastr: ToastrService,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.shcedulingForm = this.formBuilder.group({
      cliente: [null, null],
      responsavel: [null, null],
      dataConsulta: [null, null],
      horaConsulta: [null, null],
      status: [null, null],
      observacoes: [null, null],
    });

    this.getData();
    this.loadCustomers();
  }

  private getData() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== undefined && this.id != null) {
      this.schedulingService.getById(this.id).subscribe((result: any) => {
        if (result) {
          this.scheduling = result.data;
          this.isEdit = true;
          this.title = 'Editar Cliente';
          this.buttonTitle = 'ATUALIZAR';
        }
      });
    }
  }

  loadCustomers() {
    this.loading = true;

    this.customerService.getAll().subscribe({
      next: (customers: any) => {
        this.customers = customers.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Erro ao carregar clientes.', 'Erro');
      },
    });
  }

  loadResponsibles() {
    this.loading = true;

    this.customerService.getAll().subscribe({
      next: (customers: any) => {
        this.customers = customers.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Erro ao carregar clientes.', 'Erro');
      },
    });
  }
}
