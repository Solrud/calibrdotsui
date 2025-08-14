import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class File {
  openFileInNewTab(filepath: string, tabName: string): void{
    window.open(filepath, tabName)
  }
}
