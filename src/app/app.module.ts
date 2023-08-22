import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UtilbarComponent } from './utilbar/utilbar.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Util } from './shared/common/util';
import { ServicosComponent } from './servicos/servicos.component';
import { FinanceComponent } from './finance/finance.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from './shared/components/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './customers/components/customers.component';
import { CustomersFormComponent } from './customers/form/customers-form/customers-form.component';
import { ToastrModule } from 'ngx-toastr';

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
    SidebarComponent,
    SettingsComponent,
    CustomersFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    NgbModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [Util, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
