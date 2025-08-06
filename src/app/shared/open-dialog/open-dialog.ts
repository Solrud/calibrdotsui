import {inject, Injectable, signal} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {Developers} from '../../dialogs/developers/developers';
import {DialogMode} from './dialog';
import {Info} from '../../dialogs/info/info';
import {Settings} from '../../dialogs/settings/settings';
import {News} from '../../dialogs/news/news';

@Injectable({
  providedIn: 'root'
})
export class OpenDialog{
  toCenteredModal = false;

  private readonly modal = inject(NgbModal);
  private readonly configModal = inject(NgbModalConfig);

  constructor() {
    this.configModal.backdrop = 'static';
    this.configModal.keyboard = false;
    this.configModal.scrollable = true;
    this.configModal.size = 'lg';
    this.configModal.animation = true;
    this.configModal.centered = this.toCenteredModal;
  }

  // Модальное окно информации о разработчиках
  openDevelopers(){
    return this.modal
      .open(Developers);
  }

  // Модальное окно информационного или подтверждающего окна
  openInfo(title: string, message: string, mode?: DialogMode){
    const openInfo = this.modal
      .open(Info, {
        size: 'md'
      });
    openInfo.componentInstance.title = title;
    openInfo.componentInstance.message = message;
    openInfo.componentInstance.mode = mode;

    return openInfo;
  }

  openSettings(){
    return this.modal
      .open(Settings);
  }

  openNews(){
    return this.modal
      .open(News);
  }
}
