import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-access-denied',
  imports: [
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './access-denied.html',
  styleUrl: './access-denied.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'main-secondary-bg'}
})
export class AccessDenied {

}
