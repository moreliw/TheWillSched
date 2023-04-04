import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  hoje: moment.Moment = moment();
  dataSelecionada: moment.Moment = moment();
  currentDate = new Date();
  weeks: number[][] | undefined;
  semanas: moment.Moment[][] = [];

  getDaysInMonth() {
    return new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    ).getDate();
  }

  getFirstDayOfMonth() {
    return new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    ).getDay();
  }

  generateCalendar() {
    const daysInMonth = this.getDaysInMonth();
    const firstDayOfMonth = this.getFirstDayOfMonth();

    const weeks: number[][] = [[]];
    let currentWeek = 0;

    for (let i = 1; i <= daysInMonth; i++) {
      if (i === 1) {
        for (let j = 0; j < firstDayOfMonth; j++) {
          weeks[currentWeek].push();
        }
      }

      weeks[currentWeek].push(i);

      if (weeks[currentWeek].length === 7 && i < daysInMonth) {
        currentWeek++;
        weeks.push([]);
      }
    }

    this.weeks = weeks;
  }

  gerarSemanas(): void {
    const semanas: moment.Moment[][] = [];
    const primeiroDia = moment(this.dataSelecionada)
      .startOf('month')
      .startOf('week');
    const ultimoDia = moment(this.dataSelecionada).endOf('month').endOf('week');
    let dia = primeiroDia;
    let semana = 0;
    while (dia.isSameOrBefore(ultimoDia)) {
      if (!semanas[semana]) {
        semanas[semana] = [];
      }
      semanas[semana].push(moment(dia));
      dia = moment(dia).add(1, 'day');
      if (dia.day() === 0) {
        semana++;
      }
    }
    this.semanas = semanas;
  }

  selecionarData(dia: moment.Moment): void {
    this.dataSelecionada = moment(dia);
  }

  ngOnInit() {
    this.gerarSemanas();
  }

  mesAnterior(): void {
    this.dataSelecionada = moment(this.dataSelecionada).subtract(1, 'month');
    this.gerarSemanas();
  }

  mesSeguinte(): void {
    this.dataSelecionada = moment(this.dataSelecionada).add(1, 'month');
    this.gerarSemanas();
  }
}
