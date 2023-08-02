import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
      CardComponent,
      PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
  ]
})
export class SharedModule { }
