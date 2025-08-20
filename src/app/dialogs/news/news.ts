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
      new TheNews('v.1.1.0', this.makeDate(19, 8, 2025), [
        'Изменилась формула вычисления котангенса (a). Сейчас равен 2.414.',
        'Исправлена ошибка с вычислением 8 ступени.',
        'При вычислении 8 ступени ненужные поля отключаются и в .xlsx не отображаются.'
      ]),
      new TheNews('v.1.0.0', this.makeDate(11, 8, 2025), [
        'Полная версия приложения с основными функциями и улучшениями.'
      ]),
      new TheNews('v.0.5.0', this.makeDate(8, 8, 2025), [
        'Добавлены новости разработки ПО.',
        'Информация о разработчиках ПО.',
        'Добавлена выгрузка результата-таблицы в Excel файл.'
      ]),
      new TheNews('v.0.3.1', this.makeDate(6, 8, 2025), [
        'Исправлены баги, связанные с изменением полей ввода.'
      ]),
      new TheNews('v.0.2.0', this.makeDate(5, 8, 2025), [
        'Исправлены мелкие недочеты.',
        'Оптимизированы сервисы для работы с данными.'
      ]),
      new TheNews('v.0.1.3', this.makeDate(4, 8, 2025), [
        'Исправлены формулы для расчета.',
        'Поля ввода данных работают корректно.',
        'Выводится результат.'
      ]),
      new TheNews('v.0.1.2', this.makeDate(30, 7, 2025), [
        'Переопределены сервисы для работы с данными внутри приложения.'
      ]),
      new TheNews('v.0.1.1', this.makeDate(29, 7, 2025), [
        'Распределены компоненты.',
        'Создан макет приложения.',
        'Созданы сервисы для обработки данных.'
      ]),

      new TheNews('v.0.1.0', this.makeDate(25, 7, 2025), [
        'Началась разработка ПО.',
        'Подключены библиотеки для разработки.',
        'Добавлены основные элементы приложения.',
        'Добавлены куки для запоминания версии ПО и цветовой схемы.',
        'Добавлена возможность изменения темы приложения.',
      ]),
    ])
  }

  makeDate(day: number, month: number, year: number): Date{
    return new Date(year, month - 1, day);
  }

  onClickCloseModal(): void {
    this.activeModal.close();
  }
}
