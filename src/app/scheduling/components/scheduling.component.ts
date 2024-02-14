import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersFormComponent } from '../../customers/form/customers-form/customers-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarComponent } from '../../calendar/calendar.component';
import { DatePipe } from '@angular/common';
import { SchedulingFormComponent } from '../form/scheduling-form/scheduling-form.component';
import { SchedulingService } from '../scheduling.component.service';
import { Scheduling } from 'src/app/models/scheduling';
import { ToastrService } from 'ngx-toastr';
import {
  ESchedulingStatus,
  ESchedulingStatusDescriptions,
} from 'src/app/enum/ESchedulingStatus';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
})
export class SchedulingComponent implements OnInit {
  selectedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  allData: any[] = [];
  filteredData: any[] = [];
  loading = false;

  scheduling: Scheduling[] = [];

  page = {
    limit: 10,
    count: 0,
    offset: 0,
    descricao: '',
    ativo: true,
  };

  services = [
    {
      nome: 'William ',
      description:
        'A limpeza de dentes, também chamada de profilaxia, envolve a remoção de placa bacteriana.',
      price: 60,
      creationDate: '1985-05-15',
      updateDate: '1985-05-15',
    },
    {
      nome: 'Moreli',
      description:
        'A limpeza de dentes, também chamada de profilaxia, envolve a remoção de placa bacteriana.',
      price: 60,
      creationDate: '1985-05-15',
      updateDate: '1985-05-15',
    },
    {
      nome: 'da Silva',
      description:
        'A limpeza de dentes, também chamada de profilaxia, envolve a remoção de placa bacteriana.',
      price: 60,
      creationDate: '1985-05-15',
      updateDate: '1985-05-15',
    },
  ];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private schedulingService: SchedulingService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadScheduling();
  }

  loadScheduling(): void {
    this.loading = true;

    this.schedulingService.getAll(this.page).subscribe({
      next: (customers: any) => {
        this.scheduling = customers.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Erro ao carregar clientes.', 'Erro');
      },
    });
  }

  getStatusDescription(status: ESchedulingStatus): string {
    return (
      ESchedulingStatusDescriptions[status]?.description ||
      'Status Desconhecido'
    );
  }

  tabAgendadosSelected: boolean = true;
  tabAtendidosSelected: boolean = false;
  tabCancelSelected: boolean = false;

  newTag: boolean = false;

  openModal(): void {
    const modalRef = this.modalService.open(SchedulingFormComponent, {
      size: 'lg',
    });
  }

  selecionarAgendados(): void {
    this.tabAgendadosSelected = true;
    this.tabAtendidosSelected = false;
    this.tabCancelSelected = false;
  }

  selecionarAtendidos(): void {
    this.tabAgendadosSelected = false;
    this.tabAtendidosSelected = true;
    this.tabCancelSelected = false;
  }

  selecionarCancelados(): void {
    this.tabAgendadosSelected = false;
    this.tabAtendidosSelected = false;
    this.tabCancelSelected = true;
  }

  goTo(path: string) {
    this.router.navigate(['/' + path]);
  }

  openCalendar() {
    const modalRef = this.modalService.open(CalendarComponent, {
      size: 'lg',
    });
  }

  newScheduling() {
    this.router.navigate(['./new'], { relativeTo: this.route });
  }

  onDateChange() {
    this.filteredData = this.allData.filter((item) => {
      return item.date === this.selectedDate;
    });
  }
}
