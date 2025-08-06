import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {DialogMode, DialogResponse} from '../../shared/open-dialog/dialog';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  imports: [
    TranslatePipe
  ],
  templateUrl: './info.html',
  styleUrl: './info.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Info {
  title: string = '';
  message: string = '';
  mode: DialogMode = DialogMode.VIEW;

  protected readonly DialogMode = DialogMode;

  private readonly activeModal = inject(NgbActiveModal);

  onClickConfirm(){
    this.activeModal.close(DialogResponse.CONFIRM);
  }

  onClickCloseModal() {
    this.activeModal.close(DialogResponse.CANCEL);
  }
}
