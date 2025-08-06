import { TestBed } from '@angular/core/testing';

import { ToastS } from './toast-s.service';

describe('Toast', () => {
  let service: ToastS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
