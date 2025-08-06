import {AfterViewInit, Directive, inject, TemplateRef, ViewContainerRef} from '@angular/core';
import {ToastS} from '../service/toast-s.service';

@Directive({
  selector: '[appToShowToastComponent]'
})
export class ToShowToast implements AfterViewInit{
  private readonly template = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly toast = inject(ToastS);

  ngAfterViewInit() {
    let lastLength = 0;

    this.toast.getToastList$()
      .subscribe({
        next: toastList => {

          if (lastLength == 0 && toastList.length > 0)
            this.viewContainer.createEmbeddedView(this.template);

          if (lastLength == 1 && toastList.length == 0){
            this.viewContainer.clear();
          }

          lastLength = toastList.length;
        }
      })
  }
}
