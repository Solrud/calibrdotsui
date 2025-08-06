import { Injectable } from '@angular/core';
import {TextTitleDefaultEnum} from '../config/toast.enum';
import {ToastC, ToastTextC} from '../config/toast.class';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastS {
  private toastList: ToastC[] = [];
  private toastList$ = new BehaviorSubject<ToastC[]>([]);

  //формируем новый массив уведомлений и показываем
  private distributeToastList() {
    this.toastList$.next([...this.toastList]);
  }
  //проверка передачи textTitle
  private checkTextTitle(textTitleDefault: TextTitleDefaultEnum, textTitle: string | null = null): string {
    return textTitle && textTitle.trim().length > 0 ? textTitle.toUpperCase() : textTitleDefault.toUpperCase();
  }
  //получение отображаемых уведомлений
  getToastList$() {
    return this.toastList$.asObservable();
  }

  showPositive(text: ToastTextC) {
    this.toastList.push(new ToastC("", text, ["bg-success"], true, 5000));
    this.distributeToastList();
  }
  showPositiveFixed(text: ToastTextC, textTitle: string | null = null) {
    this.toastList.push(
      new ToastC(this.checkTextTitle(TextTitleDefaultEnum.SUCCESS, textTitle), text, ["bg-success"]));
    this.distributeToastList();
  }
  showPositiveFixedAdm(text: ToastTextC, textTitle: string | null = null) {
    this.toastList.push(
      new ToastC(this.checkTextTitle(TextTitleDefaultEnum.INFODEV, textTitle), text, ["bg-success"]));
    this.distributeToastList();
  }

  showWarning(text: ToastTextC, textTitle: string | null = null) {
    this.toastList.push(
      new ToastC(this.checkTextTitle(TextTitleDefaultEnum.ATTENTION, textTitle), text, ["bg-warning"], true));
    this.distributeToastList();
  }
  showWarningFixed(text: ToastTextC, textTitle: string | null = null) {
    this.toastList.push(
      new ToastC(this.checkTextTitle(TextTitleDefaultEnum.ATTENTION, textTitle), text, ["bg-warning"]));
    this.distributeToastList();
  }
  showWarningFixedAdm(text: ToastTextC, textTitle: string | null = null) {
    this.toastList.push(
      new ToastC(this.checkTextTitle(TextTitleDefaultEnum.INFODEV, textTitle), text, ["bg-warning"]));
    this.distributeToastList();
  }

  showNegative(text: ToastTextC, textTitle: string | null = null) {
    this.toastList.push(
      new ToastC(this.checkTextTitle(TextTitleDefaultEnum.ERROR, textTitle), text, ["bg-danger"], true, 15000));
    this.distributeToastList();
  }
  showNegativeFixed(text: ToastTextC, textTitle: string | null = null) {
    this.toastList.push(
      new ToastC(this.checkTextTitle(TextTitleDefaultEnum.ERROR, textTitle), text, ["bg-danger"]));
    this.distributeToastList();
  }
  showNegativeFixedAdm(text: ToastTextC, textTitle: string | null = null) {
    this.toastList.push(
      new ToastC(this.checkTextTitle(TextTitleDefaultEnum.INFODEV, textTitle), text, ["bg-danger"]));
    this.distributeToastList();
  }

  //удалить конкретное сообщение
  remove(toast: ToastC) {
    this.toastList = this.toastList.filter((t) => t !== toast);
    this.distributeToastList();
  }
  //очистить все сообщения
  clear() {
    this.toastList.splice(0, this.toastList.length);
    this.distributeToastList();
  }
}
