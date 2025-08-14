import {AfterViewInit, Directive, inject, TemplateRef, ViewContainerRef} from '@angular/core';
import {debounceTime} from 'rxjs';
import {SpinnerService} from '../service/spinner-service';

@Directive({
  selector: '[appToShowSpinner]'
})
export class ToShowSpinner implements AfterViewInit{
  private readonly spinner = inject(SpinnerService);
  private readonly template = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  ngAfterViewInit() {
    this.spinner.getSpinnerStatus()
      .pipe(debounceTime(0))
      .subscribe({
        next: result => {
          this.viewContainer.clear();
          if (result)
            this.viewContainer.createEmbeddedView(this.template);
        }
      })
  }
}
