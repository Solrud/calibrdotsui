import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import {ToastC} from '../config/toast.class';
import {Subscription} from 'rxjs';
import {ToastS} from '../service/toast-s.service';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-toast',
  imports: [
    NgbToast,
    TranslatePipe
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toast implements OnInit, OnDestroy, AfterViewInit{
  protected readonly toastList = signal<ToastC[]>([]);
  private toastHook: Subscription | undefined;

  private readonly toastS = inject(ToastS);
  private readonly elementRef = inject(ElementRef);

  ngOnInit() {
    this.initSubscribe();
  }

  initSubscribe() {
    this.toastHook = this.toastS.getToastList$()
      .subscribe({
        next: toastList => {
          this.toastList.set(toastList);
        }
      });
  }
  removeToast(toast: ToastC): void {
    this.toastS.remove(toast);
  }

  ngAfterViewInit() {
    const headerElem = document.querySelector('app-header');
    if (headerElem) {
      const headerHeight = headerElem.clientHeight;
      this.elementRef.nativeElement.style.top = (5 + headerHeight) + 'px';
    }
  }

  ngOnDestroy() {
    this.toastHook?.unsubscribe();
  }
}
