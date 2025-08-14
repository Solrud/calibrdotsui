import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Role, ROLE_UNDEFINED, User, USER_UNDEFINED} from '../auth/auth-config';
import {DEFAULT_THEME, Theme} from '../theme/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class Event {
  //! Текущий пользователь
  private currentUser$ = new BehaviorSubject<User>(USER_UNDEFINED);
  setCurrentUser(user: User) {
    this.currentUser$.next(user);
  }
  getUser() {
    return this.currentUser$.asObservable();
  }

  //! Смена пользователя (релог)
  private reLogUser$ = new BehaviorSubject<boolean>(false);
  logout() {
    this.reLogUser$.next(true);
  }
  getLogoutUser() {
    return this.reLogUser$.asObservable();
  }

  //! Текущая роль
  private currentRole$ = new BehaviorSubject<Role | null>(null);
  setRole(selectedRole: Role) {
    this.currentRole$.next(selectedRole);
  }
  getRole() {
    return this.currentRole$.asObservable();
  }

  //! Все роли пользователя
  private currentRoleList$ = new BehaviorSubject<Role[] | null>(null);
  setRoleList(roleList: Role[]) {
    this.currentRoleList$.next(roleList);
  }
  getRoleList() {
    return this.currentRoleList$.asObservable();
  }

  //! Тема приложения
  private currentAppTheme$ = new BehaviorSubject<Theme | null>(null);
  setAppTheme(currentAppTheme: Theme) {
    this.currentAppTheme$.next(currentAppTheme);
  }
  getAppTheme(){
    return this.currentAppTheme$.asObservable();
  }

  //! Версия приложения
  private currentAppVersion$ = new BehaviorSubject<string>('');
  setAppVersion(currentAppVersion: string) {
    this.currentAppVersion$.next(currentAppVersion);}
  getAppVersion(){
    return this.currentAppVersion$.asObservable();
  }
}
