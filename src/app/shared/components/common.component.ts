import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-common',
  standalone: true,
  imports: [],
  template: ``,
  styles: ``,
})
export class CommonComponent implements OnDestroy {
  destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}