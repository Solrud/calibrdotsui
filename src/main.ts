import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

// ToDo БАЗОВЫЙ КОНСТРУКТОР ПРОЕКТОВ НА ANGULAR
//  * Библиотеки базовые:
//    - @ng-bootstrap/ng-bootstrap
//    - bootstrap
//    - bootstrap-icons
//    - @ngx-translate/core
//    - ngx-translate-http-loader
//  * Environment:
//    - environment / environment.testbazis-auth / environment/testbazis / environment/bazis2-auth / environment/bazis2
//    - Конфигурации билдов в angular.json для сборки под разные env.
//    - Скрипты в package.json под конфиги билдов из angular.json (для запуска npm run {script})
//  * SSL:
//    - .cer, .key у ./public/ssl/localhost
//  * Компоненты базовые:
//    - Компонент Header -> юзер/роли, ddm меню
//    ! - Компонент Main   -> через RouterOutlet ->
//        -- Routing базовый ''[guard], 'access-denied', '**'
//    - Компонент Footer
//    - Компонент AccessDenied (по структуре находится в shared/auth)
//  * DATA API ===> Model/DTO/CRUD/Search-implements Services:
//    ! - Реализация ООП API моделей
//        -- IBase(DTO/Search/...)        -> Интерфейс пустой, для типизации в методах, чтобы понять какой тип модели используется
//        -- ABase(DTO/Search/...)        -> Абстрактный класс реализует IBase(DTO/Search/...), с свойствами повторяющимися в дочерних классах
//        -- impl./(name)(DTO/Search/...) -> Класс расширяется от ABase(DTO/Search/...), создает свои свойства
//    ! - Реализация ООП API сервисов
//        -- ABase                        -> Класс базовый для хранения baseUrl, (httpClient инжектируется в ед. виде)
//        -- I(crud/search/...)           -> Интерфейс каркаса методов для сервисов
//        -- A(crud/search/...)           -> Абстрактный класс с методами реализующий interface I(crud/search/...), расширяемый от ABase.
//        -- (CRUD/Search/...)Service     -> Сервис расширяемый от A(crud/search/...) но передающий в его super конструктор токен для url
//        -- implements./(name)Service    -> Сервис реализующий все interface I(crud/search/...), инжектит (CRUD/Search/etc..)Service и создает методы на их основе вызывая в них методы сервисов
//  * Стили/Темы:
//    - Константы Scss/ Тема Scss
//    - Theme Service
//    - Style.scss переопределения
//  * Авторизация:
//    - AuthService
//    - Guard
//    - Interceptor (withCredentials)
//    - Page 403
//    - Выдача ролей в app.ts / next() в EventService
//  * LocalStorage:
//    - Event Service
//    - В app.ts (в Smart компоненте) инициализация/присвоение значений из/в LocalStorage
//  * Shared:
//    - EventService => RxJs Observables
//    - ...Остальные сервисы/ Работы с сущностями/ data и тд.
//  * Модальные окна:
//    - Компоненты диалогов:
//      -- Developers  -> Инфо о разработчиках/Отделе
//      -- Information -> Информационное окно с принятием решения
//      -- Settings    -> Настройки сущностей
//      -- News        -> Новости изменений ПО
//    - OpenDialog Service
//  * Спиннер:
//    - Interceptor счетчик запросов
//    - Event Service
//    - Директива спиннера [appToShowSpinner]
//    - Компонент спиннера
//    - провайдинг в app.config()
//  * Всплывающие уведомления:
//    - Компонент Toast
//    - Service Toast
//    - Config Toast
//    - Директива Toast [appToShowToastComponent]
//  * i18n:
//    - Библиотеки: @ngx-translate/core, ngx-translate-http-loader (не multi).
//    - ./18n/ru.json
//    - ./shared/httpLoaferFactory() функция и ReMissingTranslationHandler переопределение обработчика
//    - провайдинг в app.config()
//  * Важные внесения изменений:
//   ? - В angular.json:
//      | "schematics": {
//         "@schematics/angular:component": {"changeDetection": "OnPush", "style": "scss"},
//         "@schematics/angular:directive": {"flat": false}},|
//      | ..assets: "input": "public","output": "public" |
//      | в configurations у budgets если превышает норму budgets: maximumWarning, maximumError увеличить в размерах хранилище |
//      | Прописать в configurations разные конфиги сборок под environments |
//      | В serve: options: ssl: true, sslCert и sslKey пути до SSL |
//      | В build: options:
//       "polyfills": [
//         "@angular/localize/init" для i18n
//        ],
//       "stylePreprocessorOptions": {
//           "sass": {"silenceDeprecations": ["color-functions", "global-builtin", "import", "mixed-decls"]}
//         } Чтобы не было warning'ов в консоли насчет scss |
//  ?  - В package.json:
//      Написать скрипты scripts:
//       "build": "ng build --configuration bazis2 --base-href=/APP-NAME/",
//       "build-auth": "ng build --configuration bazis2-auth --base-href=/APP-NAME/",
//       "build-test": "ng build --configuration testbazis --base-href=/APP-NAME/",
//       "build-test-auth": "ng build --configuration testbazis-auth --base-href=/APP-NAME/",
//       "t-update": "ngx-translate-extract --input ./src --output public/i18n/ru.json public/i18n/en.json --sort --format namespaced-json",
//      Запускать скрипты через: npm run {script name}
//  ?  - В app.config:
//      | Запровайдить  provideHttpClient() в аргумент withInterceptors([..список интерцепторов..]) |
//      | Запровайдить Translate ngx => provideTranslateService({
//          useDefaultLang: environment.production,
//          loader: {
//          provide: TranslateLoader,
//          useFactory: httpLoaderFactory,
//          deps: [HttpClient]
//          },
//          missingTranslationHandler: {
//            provide: MissingTranslationHandler,
//            useClass: MissingTranslationService
//            }
//          }) |
//  * Прочее:
//    - Изменить favicon.ico
//    - Изменить title в index.html под название ПО
//    - Стратегия ChangeDetection - OnPush
//    - Использование всевозможно сигналов
//    - немного по другому принимать подписки в .subscribe({next: () => {}})
//    - Все подписки помещать в массив и отписываться на хуке ngOnDestroy
//  *  В Будущем TO-DO:
//    - | Изменится структура api-services, будет инкапсулированный api-service, который будет трансформировать приходящий ответ JSON,
//    через class-transformer в экземпляр класса DTO, с переопределением, к примеру,
//    .toString() для использования по-умолчанию вывода в string наименования объекта(filter, formControls value),
//    поток будет отдаваться через поток обертку.
//    Далее приходящий из api-service поток, забирается в сервисе обертке, куда уже имеется доступ из вне |
//
//  * Структура (примерная):
//?  ./src
//?    |-- public
//?    |   |-- files
//?    |   |-- i18n
//?    |   |-- images
//?    |   |-- scss
//?    |   |-- ssl
//?    |   `-- ...
//?    |-- app
//?    |   |-- components
//?    |   |-- dialogs
//?    |   |-- pages
//?    |   `-- shared
//?    |         |-- data (old struct)
//?    |         |   |-- model
//?    |         |   |-- service
//?    |         |   |-- url
//?    |         |   `-- ...
//?    |         `--...
//?    `-- environments
