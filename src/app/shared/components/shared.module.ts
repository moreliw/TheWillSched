import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
      CardComponent,
      SidebarComponent,
      PageNotFoundComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CardComponent,
    PageNotFoundComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
