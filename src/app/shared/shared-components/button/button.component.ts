import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string | undefined;
  @Input() disabled = false;
  @Input() classes = '';
  @Output() click = new EventEmitter();

  onClick() {
    this.click.emit();
  }
}
