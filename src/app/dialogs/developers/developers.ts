import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-developers',
  imports: [
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './developers.html',
  styleUrl: './developers.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Developers {
  activeModal = inject(NgbActiveModal);

  date: Date = new Date();

  onClickCancel(): void {
    this.activeModal.close();
  }
}
