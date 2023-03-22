import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Output() onClick = new EventEmitter<void>();
  @Input()
  title!: string;
  @Input() cursorDefault = false;
  @Input() class = '';
  @Input()
  disabled!: boolean;
  @Input()
  theme!:
    | 'btn-theme'
    | 'btn-color-primary'
    | 'btn-color-blue'
    | 'btn-color-green'
    | 'btn-color-purple'
    | 'btn-theme-inverted'
    | 'btn-primary-inverted'
    | 'btn-danger-inverted'
    | 'btn-three-inverted'
    | 'btn-yellow-inverted';
}
