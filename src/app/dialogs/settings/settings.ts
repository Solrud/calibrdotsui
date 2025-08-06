import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {NgbActiveModal, NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {DialogResponse} from '../../shared/open-dialog/dialog';

@Component({
  selector: 'app-settings',
  imports: [
    TranslatePipe,
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavContent,
    NgbNavOutlet
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Settings {
  private readonly activeModal = inject(NgbActiveModal);


  onClickCloseModal() {
    this.activeModal.close(DialogResponse.CANCEL);
  }
}
