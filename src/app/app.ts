import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DEFAULT_LANGUAGE, LANGUAGE_LIST} from './shared/translate/translate-languages';
import {ThemeService} from './shared/theme/theme.service';
import {Theme} from './shared/theme/theme.enum';
import {ToShowSpinner} from './shared/spinner/directive/to-show-spinner.directive';
import {Spinner} from './shared/spinner/spinner/spinner';
import {Toast} from './shared/toast/component/toast';
import {ToShowToast} from './shared/toast/directive/to-show-toast.directive';
import {Auth} from './shared/auth/service/auth';
import {Role, User, UserRoleAuthEnum} from './shared/auth/auth-config';
import {LS} from './shared/local-storage/config/local-storage.constants';
import {Event} from './shared/event/event';
import {LocalStorage} from './shared/local-storage/service/local-storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToShowSpinner, Spinner, Toast, ToShowToast,],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit{
  userLocalStorageName: string = '';
  user: User | undefined ;
  userRoleList: Role[] = [];

  readonly translate = inject(TranslateService);
  readonly theme = inject(ThemeService);
  readonly event = inject(Event);
  readonly auth = inject(Auth);
  readonly ls = inject(LocalStorage);


  ngOnInit() {
    this.initTranslate();
    this.initUserAndLocalStorage();
  }

  initTranslate(): void {
    this.translate.addLangs(LANGUAGE_LIST);
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    this.translate.use(DEFAULT_LANGUAGE);
  }

  initUserAndLocalStorage(): void{
    // Получение пользователя и дальнейшая работа с LS
    this.auth.getUserFromServer().subscribe({
      next: (user: User): void => {
        this.user = user;

        this.userLocalStorageName = LS.APP + ':' + this.user.id +
          this.user.firstName.toLowerCase() + this.user.lastName.toLowerCase();

        this.event.setCurrentUser(this.user);
        this.defineUserRoleList();

        this._changeRole();
        this._changeTheme();
        this._changeVersion();
        this._logout();

        this.initLocalStorageValues();
      }
    })
  }

  defineUserRoleList(): void {
    // Определение ролей у пользователя этого ПО
    if (this.userRoleList.length === 0){
      Object.values(UserRoleAuthEnum).forEach(value => {
        if (this.user){
          this.user.roleSet.forEach(role => {
            if (value === role.name)
              this.userRoleList.push(role);
          });
        }
      });
      this.event.setRoleList(this.userRoleList);
    }
  }

  initLocalStorageValues(): void {
    // Парсинг значений из local storage
    let userLSValuesParse = this.ls.getLS(this.userLocalStorageName);
    if (!userLSValuesParse) userLSValuesParse = {};

    //! Инициализация роли пользователя
    const roleLS = userLSValuesParse[LS.APP_ROLE];
    let roleUser = null;
    if (roleLS) roleUser = this.userRoleList.find(role => {
      return role.name === roleLS
    });
    const role = roleUser ? roleUser : this.userRoleList[0];
    this.event.setRole(role);

    //! Инициализация темы ПО
    let themeLocalStorage = userLSValuesParse[LS.APP_THEME]
    const theme = themeLocalStorage ? themeLocalStorage : Theme.LIGHT;
    this.event.setAppTheme(theme);

    //! Инициализация версии приложения (для отображения колокольчика уведомлений)
    const versionLocalStorage = userLSValuesParse[LS.APP_VERSION];
    const version = versionLocalStorage ? versionLocalStorage : 'v.0.0.0';
    this.event.setAppVersion(version);
  }

  // Подписка на смену роли
  _changeRole(): void{
    this.event.getRole()
      .subscribe({
        next: role => {
          if (role)
            this.ls.addValueLS(this.userLocalStorageName, LS.APP_ROLE, role.name);
        }
      })
  };

  // Подписка на смену темы
  _changeTheme(): void{
    this.event.getAppTheme()
      .subscribe({
        next: (theme: Theme | null): void => {
          if (theme) {
            this.ls.addValueLS(this.userLocalStorageName,LS.APP_THEME, theme);
            this.theme.changeTheme(theme);
          }
        }
      })
  };

  // Подписка на смену версии ПО
  _changeVersion(): void{
    this.event.getAppVersion()
      .subscribe({
        next: (version: string): void => {
          if (version)
            this.ls.addValueLS(this.userLocalStorageName, LS.APP_VERSION, version);
        }
      })
  };

  // Подписка на выход из приложения
  _logout(): void {
    this.event.getLogoutUser()
      .subscribe(changeUser => {
        if (changeUser) this.auth.logout();
      });
  }
}
