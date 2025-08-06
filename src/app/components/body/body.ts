import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-body',
  imports: [],
  templateUrl: './body.html',
  styleUrl: './body.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Body {
}
