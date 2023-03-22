import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [ButtonComponent],
  exports: [CommonModule, ButtonComponent],
  imports: [CommonModule],
})
export class SharedComponentsModule {}
