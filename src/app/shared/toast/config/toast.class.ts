export class ToastC {
  constructor(noteTitle: string, noteText: ToastTextC, className: string[], autoHide: boolean = false, delay: number = 10000) {
    this.title = noteTitle;
    this.message = noteText;
    this.className = className;
    this.autoHide = autoHide;
    this.delay = delay;
  }
  id = Math.random() * 10;
  title: string;
  message: ToastTextC;
  className: string[];
  autoHide: boolean;
  delay: number;
}
export class ToastTextC {
  constructor(keyForTranslate: string, paramFotTranslate: string | null = null) {
    this.key = keyForTranslate;
    this.param = paramFotTranslate;
  }
  key: string;
  param: string | null;
}
