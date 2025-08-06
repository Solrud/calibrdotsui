import {Injectable} from '@angular/core';
import {Theme} from './theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService{
  private currentTheme: Theme | null = null;

  changeTheme(theme: Theme){
    if (this.currentTheme){
      document.body.classList.remove(this.currentTheme + '-theme');
    }

    this.currentTheme = theme;
    document.body.classList.add(this.currentTheme + '-theme');
  }
}
