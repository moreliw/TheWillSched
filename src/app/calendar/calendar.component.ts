import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  today: Date = new Date();
  fixToday: Date = new Date();
  weeks: InfoDays[][] | undefined;
  daysInMonth: InfoDays[] = [];

  ngOnInit() {
    this.getMonthDays(this.today.getFullYear(), this.today.getMonth());
  }

  selecionarData(day: InfoDays): void {
    if (day.type === 'previous') {
      this.previousMonth();
    }

    if (day.type === 'next') {
      this.nextMonth();
    }
    this.daysInMonth.forEach((d) => (d.selected = false));
    day.selected = true;
  }

  getMonthDays(year: number, month: number): void {
    const days: number[] = [];

    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    // Último dia do mês anterior
    const lastDayPreviousMonth = new Date(year, month, 0);
    // Último dia do mês atual
    const lastDay = new Date(year, month + 1, 0);

    // Dias do mês anterior
    for (let i = firstDay.getDay() - 1; i >= 0; i--) {
      days.push(lastDayPreviousMonth.getDate() - i);
      this.daysInMonth.push({
        day: lastDayPreviousMonth.getDate() - i,
        type: 'previous',
      });
    }

    // Dias do mês atual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
      this.daysInMonth.push({
        day: i,
        type: 'current',
        selected:
          i === this.fixToday.getDate() && month === this.fixToday.getMonth(),
      });
    }

    // Dias do próximo mês
    const nextMonthDays = 7 - (days.length % 7);
    if (nextMonthDays < 7) {
      for (let i = 1; i <= nextMonthDays; i++) {
        days.push(i);
        this.daysInMonth.push({
          day: i,
          type: 'next',
        });
      }
    }

    this.weeks = this.getDaysInWeeks(this.daysInMonth);
  }

  getDaysInWeeks(days: InfoDays[]): InfoDays[][] {
    const weeks: InfoDays[][] = [];

    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }

  nextMonth(): void {
    const date = moment(this.today).add(1, 'month').toDate();
    this.today = date;
    this.daysInMonth = [];
    this.weeks = [];
    this.getMonthDays(date.getFullYear(), date.getMonth());
  }

  previousMonth(): void {
    const date = moment(this.today).subtract(1, 'month').toDate();
    this.today = date;
    this.daysInMonth = [];
    this.getMonthDays(date.getFullYear(), date.getMonth());
  }

  returnMonthName(month: number): string {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    return months[month];
  }

  reuturnMonthAndYear(): string {
    return `${this.returnMonthName(
      this.today.getMonth()
    )} ${this.today.getFullYear()}`;
  }
}

class InfoDays {
  constructor(
    public day?: number,
    public type?: string,
    public selected?: boolean
  ) {}
}
