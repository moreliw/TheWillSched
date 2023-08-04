import { Component } from '@angular/core';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent {
  tabAgendadosSelected: boolean = true;
  tabAtendidosSelected: boolean = false;
  tabCancelSelected: boolean = false;

  newTag: boolean = false;

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
