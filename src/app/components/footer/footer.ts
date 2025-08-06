import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {OpenDialog} from '../../shared/open-dialog/open-dialog';

@Component({
  selector: 'app-footer',
  imports: [DatePipe, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer implements OnInit{
  date: Date | undefined;

  private readonly openDialog = inject(OpenDialog);

  ngOnInit(): void {
    this.date = new Date();
  }

  onClickOpenDevInfoDialog(): void{
    this.openDialog.openDevelopers();
  }
}
