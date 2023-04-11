import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductStockListComponent } from './product-stock-list/product-stock-list.component';
import { SharedComponentsModule } from './shared/shared-components/shared-components.module';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductStockListComponent,
    CalendarComponent,
    DashboardComponent,
    SidebarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
