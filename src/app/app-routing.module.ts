import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { ServicosComponent } from './servicos/servicos.component';
import { FinanceComponent } from './finance/finance.component';
import { SettingsComponent } from './settings/settings.component';
import { CustomersComponent } from './customers/components/customers.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'scheduling', component: SchedulingComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'servicos', component: ServicosComponent},
  { path: 'finance', component: FinanceComponent},
  { path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
