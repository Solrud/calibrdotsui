export class User {
  constructor(id: number, firstName: string, lastName: string, roleSet: Role[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleSet = roleSet;
  }
  id: number; // обязательное поле, по нему определяется пользователь
  username: string = "";
  email: string = "";
  firstName: string;
  lastName: string;
  patronymicName: string = "";
  description: string = "";
  password: string = ""; // не передается с сервера (только от клиента к серверу, например, при обновлении)
  roleSet: Role[]; // USER, ADMIN, MODERATOR и т.д.
}
export class Role {
  id: number;
  name: string;
  viewName: string;
  description: string;

  constructor(id: number, name: string, viewName: string, description: string =" ") {
    this.id = id;
    this.name = name;
    this.viewName = viewName;
    this.description = description;
  }
}
//todo снизу изменить нейминг своего ПРОЕКТА -.
//            ENUM <APP-NAME>                 |
//                                            V
//enum с возможными ролями пользователя, для данного приложения
export enum UserRoleAuthEnum {
  ADMIN = 'APP_NAME_ADMIN',
  USER = 'APP_NAME_USER',
  VIEW = 'APP_NAME_VIEW'
}

//todo снизу изменить нейминг своего ПРОЕКТА -.
//            NAME ENUM <APP-NAME>            |
//                                            V
//стандартная инициализация роли
export const ROLE_UNDEFINED = new Role(99999, 'NONE_ROLE', 'Роль не найдена у пользователя');
//инициализация пользователя, если выключена авторизация
export const USER_UNDEFINED = new User(99999, 'Админ', 'Ктович', [
  new Role(2, UserRoleAuthEnum.ADMIN, 'Архив УП: Администратор'),
  new Role(3, UserRoleAuthEnum.USER, 'Архив УП: Пользователь'),
  new Role(4, UserRoleAuthEnum.VIEW, 'Архив УП: Гость')
]);
