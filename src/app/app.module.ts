import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductStockListComponent } from './product-stock-list/product-stock-list.component';
import { SharedComponentsModule } from './shared/shared-components/shared-components.module';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UtilbarComponent } from './utilbar/utilbar.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductStockListComponent,
    CalendarComponent,
    DashboardComponent,
    NavbarComponent,
    UtilbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
