import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Event} from '../../shared/event/event';
import {DEFAULT_APP_VERSION, TheNews} from './news.config';
import {DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-news',
  imports: [
    DatePipe,
    TranslatePipe
  ],
  templateUrl: './news.html',
  styleUrl: './news.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class News implements OnInit{
  private readonly activeModal = inject(NgbActiveModal);
  private readonly eventService = inject(Event);

  readonly allNews = signal<TheNews[]>([])
  readonly userAppVersion = signal<string>('');
  readonly currentAppVersion = signal<string>(DEFAULT_APP_VERSION);
  readonly isFirstTimeOpened = signal<boolean>(false);

  ngOnInit(): void {
    this._currentAppVersion();
    this.packNewsList();
  }

  _currentAppVersion(){
    this.eventService.getAppVersion().subscribe({
      next: version => {
        if(version){
          this.userAppVersion.set(version);
          if (this.userAppVersion() !== this.currentAppVersion())
            this.isFirstTimeOpened.set(true);
        }
      }
    })
  }

  packNewsList(){
    this.allNews.set([
      new TheNews('v.0.0.0', this.makeDate(1, 8, 2025), ['Первая новость.']),
    ])
  }

  makeDate(day: number, month: number, year: number): Date{
    return new Date(year, month - 1, day);
  }

  onClickCloseModal(): void {
    this.activeModal.close();
  }
}
