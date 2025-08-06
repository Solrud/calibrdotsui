import {AfterViewInit, Directive, inject, TemplateRef, ViewContainerRef} from '@angular/core';
import {Event} from '../../event/event';
import {debounceTime} from 'rxjs';

@Directive({
  selector: '[appToShowSpinner]'
})
export class ToShowSpinner implements AfterViewInit{
  private readonly event = inject(Event);
  private readonly template = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  ngAfterViewInit() {
    this.event.getSpinnerStatus()
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
