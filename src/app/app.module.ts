import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UtilbarComponent } from './utilbar/utilbar.component';
import { SchedulingComponent } from './scheduling/components/scheduling.component';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './customers/components/customers.component';
import { CustomersFormComponent } from './customers/form/customers-form/customers-form.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './auth/auth.module';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { SchedulingFormComponent } from './scheduling/form/scheduling-form/scheduling-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropDownComponent } from './shared/components/drop-down/drop-down.component';
import { ResponsiblesComponent } from './responsibles/responsibles.component';
import { ResponsibleFormComponent } from './responsibles/responsible-form/responsible-form.component';
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
    SchedulingFormComponent,
    DropDownComponent,
    ResponsiblesComponent,
    ResponsibleFormComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(),
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
    AuthModule,
    NgSelectModule,
  ],
  providers: [
    Util,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
