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
import { ActivatedRoute, Router } from '@angular/router';
import { Scheduling } from 'src/app/models/scheduling';
import { Customer } from 'src/app/models/customer';
import { ResponsibleService } from 'src/app/responsibles/responsibles.component.service';
import { Responsible } from 'src/app/models/responsible';

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
  responsibles: Responsible[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private schedulingService: SchedulingService,
    private toastr: ToastrService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private responsibleService: ResponsibleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.shcedulingForm = this.formBuilder.group({
      scheduling: [null],
      idCliente: [null, null],
      idResponsavel: [null, null],
      dataAgendamento: [null, null],
      horaAgendamento: [null, null],
      status: [null, null],
      observacoes: [null, null],
    });

    this.getData();
    this.loadCustomers();
    this.loadResponsibles();
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

    this.responsibleService.getAll().subscribe({
      next: (result: any) => {
        this.responsibles = result;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Erro ao carregar os responsáveis.', 'Erro');
      },
    });
  }

  addScheduling() {
    this.loading = true;

    // Obtenha o valor do campo horaAgendamento do formulário
    const horaAgendamentoValue =
      this.shcedulingForm.get('horaAgendamento').value;

    // Divida a string da hora para obter as horas e os minutos
    const [hour, minute] = horaAgendamentoValue.split(':');

    // Crie um novo objeto Date definindo as horas e os minutos
    const horaAgendamento = `${hour}:${minute}:00`; // Adicionamos :00 para garantir que estamos enviando a hora no formato completo

    // Atribua o valor convertido de volta ao campo horaAgendamento no formulário
    this.shcedulingForm.patchValue({ horaAgendamento: horaAgendamento });

    console.log(this.shcedulingForm.value);

    this.schedulingService.addScheduling(this.shcedulingForm.value).subscribe({
      next: () => {
        this.toastr.success('Agendamento realizado', 'Sucesso');
        this.goBack();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Algo deu errado!', 'Não foi possível agendar');
      },
    });
  }

  updateScheduling(id: number, scheduling: any) {
    scheduling.id = id;

    this.loading = true;
    this.schedulingService.updateScheduling(id, scheduling).subscribe({
      next: () => {
        this.toastr.success('Responsável atualizado com sucesso!', 'Sucesso');
        this.goBack();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error(
          'Erro ao atualizar responsável',
          'Não possível adicionar'
        );
      },
    });
  }

  goBack() {
    const currentUrl = this.route.snapshot.url;
    if (currentUrl[currentUrl.length - 1].path === 'new') {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }
}
