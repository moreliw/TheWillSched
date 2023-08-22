import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    CardComponent,
    PageNotFoundComponent,
    LoadingComponent,
    ConfirmModalComponent,
  ],
  imports: [CommonModule],
  exports: [CommonModule, LoadingComponent, ConfirmModalComponent],
})
export class SharedModule {}
