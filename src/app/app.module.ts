import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UtilbarComponent } from './utilbar/utilbar.component';
import { CustomersComponent } from './customers/customers.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from './shared/components/shared.module';
import { Util } from './shared/common/util';
import { ServicosComponent } from './servicos/servicos.component';
import { FinanceComponent } from './finance/finance.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DashboardComponent,
    NavbarComponent,
    UtilbarComponent,
    CustomersComponent,
    SchedulingComponent,
    ServicosComponent,
    FinanceComponent,
    CustomerFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    NgbModule
  ],
  providers: [Util],
  bootstrap: [AppComponent],
})
export class AppModule {}
