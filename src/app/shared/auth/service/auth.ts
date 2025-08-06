import {inject, Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User, USER_UNDEFINED} from '../auth-config';
import {HttpClient} from '@angular/common/http';
import {AUTH_URL_TOKEN, LOGIN_URL_TOKEN} from '../url/auth.token';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  isLoggedIn: boolean = false;

  // текущий залогиненный пользователь, изначально стандартный
  private userFromServer$ = new BehaviorSubject<User>(USER_UNDEFINED);
  getUserFromServer(){
    return this.userFromServer$.asObservable();
  }
  setUserFromServer(user: User): void{
    this.userFromServer$.next(user);
  }

  private readonly httpClient =  inject(HttpClient);
  constructor(@Inject(AUTH_URL_TOKEN) private authUrl: string,
              @Inject(LOGIN_URL_TOKEN) private loginUrl: string) {

  }

  // авто логин пользователя (если есть в куках JWT, то от бекенда вернется статус 200 и текущий пользователь)
  public autoLogin(): Observable<User> {
    return this.httpClient.post<User>(this.authUrl + '/auto', null);
  }

  //открыть страницу ввода логина в новой вкладке
  public openLoginBazis2(): void {
    window.open(this.loginUrl, 'Login Bazis 2');
  }

  //выход из приложения
  public logout(): void {
    this.setUserFromServer(USER_UNDEFINED); // сброс пользователя до стандартного
    this.isLoggedIn = false; // Указываем что пользователь разлогинился,
    // чтобы удалить кук с флагом httpOnly необходимо попросить об этом сервер, т.к. клиент не имеет доступ к куку
    this.httpClient.post<any>(this.authUrl + '/logout', null).subscribe();
    this.openLoginBazis2();
  }
}
