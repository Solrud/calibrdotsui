import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
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
export class Toast implements OnInit, OnDestroy{
  protected readonly toastList = signal<ToastC[]>([]);
  private toastHook: Subscription | undefined;

  private readonly toastS = inject(ToastS);

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

  ngOnDestroy() {
    this.toastHook?.unsubscribe();
  }
}
