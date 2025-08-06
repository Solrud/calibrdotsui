import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {
  //установка нового значения LS
  private setLS(nameLS: string, valueLS: string): void {
    localStorage.setItem(encodeURI(nameLS), JSON.stringify(valueLS));
  }

  // Получение значения LS
  getLS(nameLS: string): any {
    const valueLS = localStorage.getItem(encodeURI(nameLS));
    if (valueLS) return JSON.parse(decodeURI(valueLS))
    else return null;
  }

  // Добавление значения в LS
  addValueLS(nameLS: string, nameFieldLS: string, valueFieldLS: any): void {
    const valueLS = this.getLS(nameLS);
    let valueLSParse = valueLS ? valueLS : {};
    valueLSParse[nameFieldLS] = valueFieldLS;
    this.setLS(nameLS, valueLSParse);
  }

  // Удаление всего LS этого ПО у пользователя
  deleteLS(nameLS: string): void {
    localStorage.removeItem(encodeURI(nameLS));
  }
}
