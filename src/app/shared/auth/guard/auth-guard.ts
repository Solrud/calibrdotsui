import {CanActivateFn, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {inject} from '@angular/core';
import {Auth} from '../service/auth';
import {catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(Auth);
  const router = inject(Router);


  // route - параметр, который хранит начение URL, по которому хотим перейти
  // 1. Залогинен ли вообще пользователь
  // 2. Есть ли у него соответствующие роли
  if (!environment.auth)
    return true;

  if (authService.isLoggedIn) { // если пользователь уже залогинен
    // если у пользователя есть права на эту страницу, то вернется true и произойдет переход на запрошенный url

    authService.getUserFromServer().subscribe({
      next: result => {
        return userHasRequiredRole(result.roleSet, route.data['allowedRoles']);
      }
    })
    // old - если не будет работать как выше
    // return userHasRequiredRole(authService.getUserFromServer().subscribe({
    //   next: result => result.roleSet, route.data['allowedRoles'])
    // });
  }

  // пытаемся провести автоматическую аутентификацию.
  // если в браузере был сохранен jwt-кук, он будет отправлен на backend и пользователь автоматически залогинится
  // отправляем запрос для получения пользователя (т.к. пользователь не хранится локально, это не безопасно)
  // при каждом обновлении страницы нужно получить заново пользователя из backend'a
  return authService.autoLogin().pipe( // не путать pipe из angular и pipe из rxjs
    map(result => {
      if (result) {
        const user = result; // получаем пользователя из JSON
        // сохраняем пользователя в сервис для дальнейшего использования из сервиса
        authService.setUserFromServer(user);
        authService.isLoggedIn = true; // индикатор, что пользователь залогинился
        // если у пользователя есть права на эту страницу, то возвращаем true и перебрасываем на запрошенный url
        return userHasRequiredRole(user.roleSet, route.data['allowedRoles']);
      } else { // если пользователь неавторизован, то отправить его на главную страницу
        router.navigate(['/access-denied']);
        authService.openLoginBazis2();
        return false; // не переходить по запрошенному url
      }
    }),
    catchError(err => {
      router.navigate(['/access-denied']);
      authService.openLoginBazis2();
      // return of(false); // не переходить по запрошенному url
      //https://rxjs.dev/deprecations/scheduler-argument
      return of(false); // не переходить по запрошенному url
    })
  )
};

/*проверяет пересечение ролей из 2-х списков
* userRoles - роли пользователя
* allowedRoles - роли для доступа к URL*/
export function userHasRequiredRole(userRoles: Array<any>, allowedRoles: Array<string>): boolean {
  const router = inject(Router);

  for (const r of allowedRoles) {
    if (userRoles.find(e => e.name === r)) {
      return true; // если совпала хотя бы одна найденная запись
    }
  }
  router.navigate(['/access-denied']); // есди нет доступа, то перенаправляем на страницу access-denied
  return false; // нужная роль не найдена
}
