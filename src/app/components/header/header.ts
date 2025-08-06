import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipe} from '@ngx-translate/core';
import {Theme} from '../../shared/theme/theme.enum';
import {Role, ROLE_UNDEFINED, User, USER_UNDEFINED} from '../../shared/auth/auth-config';
import {Subscription} from 'rxjs';
import {Event} from '../../shared/event/event';
import {ThemeService} from '../../shared/theme/theme.service';
import {OpenDialog} from '../../shared/open-dialog/open-dialog';
import {DEFAULT_APP_VERSION} from '../../dialogs/news/news.config';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    TranslatePipe,
    NgbDropdownItem,
    NgTemplateOutlet
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header implements OnInit, OnDestroy {
  private hookList: (Subscription | undefined)[] = [];
  readonly currentUser = signal<User>(USER_UNDEFINED);
  readonly currentRole = signal<Role | null>(ROLE_UNDEFINED);
  readonly currentTheme = signal<Theme | null>(null);
  readonly showNewsAttention = signal<boolean>(true);
  readonly currentAppRoleList = signal<Role[] | null>(null);

  defaultVersion = DEFAULT_APP_VERSION;

  private readonly event = inject(Event);
  private readonly theme = inject(ThemeService);
  private readonly openDialog = inject(OpenDialog);

  protected readonly Theme = Theme;

  ngOnInit() {
    this._getCurrentUser();
    this._getRole();
    this._getAppTheme();
    this._getRoleList();
    this._getVersion();
  }

  // Подписка на получение пользователя
  _getCurrentUser() {
    const hookUser = this.event.getUser()
      .subscribe({
        next: currentUser => {
          this.currentUser.set(currentUser);
        }
      });
    this.hookList.push(hookUser);
  }

  // Подписка на роль
  _getRole() {
    const hookRole = this.event.getRole()
      .subscribe({
        next: currentRole => {
          this.currentRole.set(currentRole);
        }
      });
    this.hookList.push(hookRole);
  }

  // Подписка на список ролей
  _getRoleList(): void {
    const hookRoleList = this.event.getRoleList()
      .subscribe({
        next: roleList => {
          if (roleList) this.currentAppRoleList.set(roleList);
        }
      })
    this.hookList.push(hookRoleList);
  }

  // Подписка на версию ПО
  _getVersion(): void {
    this.event.getAppVersion().subscribe({
      next: version => {
        if (version) {
          const toShowAttention = version != this.defaultVersion;
          this.showNewsAttention.set(toShowAttention);
        }
      }
    })
  }

  // Подписка на тему ПО
  _getAppTheme() {
    const hookTheme = this.event.getAppTheme()
      .subscribe({
        next: currentTheme => {
          if (currentTheme) this.currentTheme.set(currentTheme);
        }
      });
    this.hookList.push(hookTheme);
  }

  // Получение названия роли
  getRoleViewName(role: Role): string {
    const viewName = role.viewName.split(':');
    return viewName.at(-1) || "No role";
  }

  // Выбор роли из списка
  onClickSelectRole(event: any): void {
    const role: Role | undefined = this.currentAppRoleList()?.find((role) => role.name === event.target.value);
    if (role instanceof Role)
      this.event.setRole(role)
  }

  // Открыть окно Новости
  onClickOpenNewsDialog() {
    const hookNews = this.openDialog.openNews()
      .closed
      .subscribe({
        next: () => this.event.setAppVersion(this.defaultVersion)
      });
    this.hookList.push(hookNews);
  }

  // Открыть окно Разработчики
  onClickOpenDevelopersInfoDialog() {
    this.openDialog.openDevelopers();
  }

  // Сменить тему
  onClickToggleTheme(): void {
    const newTheme = this.currentTheme() === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.event.setAppTheme(newTheme);
  }

  // Открыть окно Настройки
  onClickSettings() {
    this.openDialog.openSettings();
  }

  // Смена пользователя / Выход из ПО
  onClickChangeUserOrLogout() {
    this.event.logout();
  }


  ngOnDestroy() {
    // Отписка от всех обзерверов
    this.hookList.forEach(observed => observed?.unsubscribe());
  }
}
