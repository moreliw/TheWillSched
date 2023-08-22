import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersFormComponent } from '../customers/form/customers-form/customers-form.component';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent {
  constructor(
    private modalService: NgbModal) { }

  tabAgendadosSelected: boolean = true;
  tabAtendidosSelected: boolean = false;
  tabCancelSelected: boolean = false;

  newTag: boolean = false;

  openModal(): void {
    const modalRef = this.modalService.open(CustomersFormComponent, {size: 'lg',});
    console.log(modalRef);
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
}
