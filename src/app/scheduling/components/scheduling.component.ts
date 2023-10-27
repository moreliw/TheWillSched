import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersFormComponent } from '../../customers/form/customers-form/customers-form.component';
import { Router } from '@angular/router';
import { CalendarComponent } from '../../calendar/calendar.component';
import { DatePipe } from '@angular/common';
import { SchedulingFormComponent } from '../form/scheduling-form/scheduling-form.component';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
})
export class SchedulingComponent implements OnInit {
  selectedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  allData: any[] = [];
  filteredData: any[] = [];

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
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    console.log(this.selectedDate);
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

  onDateChange() {
    console.log(this.selectedDate);
    this.filteredData = this.allData.filter((item) => {
      return item.date === this.selectedDate;
    });
  }
}
