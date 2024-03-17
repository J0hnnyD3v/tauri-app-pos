import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { catchError, delay, of, takeUntil, tap } from 'rxjs';

import { primengModules } from '@src/primeng-modules';

import { ProductsService } from '@src/check-in/services/products.service';
import { SpinnerService } from '@src/shared/services/spinner.service';

import { CommonComponent } from '@src/shared/components/common.component';

import { ISpinner } from '@src/shared/interfaces';

@Component({
  selector: 'check-in-products',
  standalone: true,
  imports: [CommonModule, ...primengModules],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends CommonComponent implements OnInit {
  private _productsService = inject(ProductsService);
  private _spinnerService = inject(SpinnerService);

  isRequesting = signal(false);
  url = 'ProductsComponent';

  ngOnInit(): void {
    this._spinnerService.loadingByUrl$
      ?.pipe(
        takeUntil(this.destroy$),
        delay(0), // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
        tap((values: ISpinner[]) => this.isRequesting.update(v => values.some(v => v.url === this.url) ? true : false)),
      )?.subscribe();

    this._spinnerService.setLoadingByUrl(true, this.url);
    this._productsService.getAllProducts()
      ?.pipe(
        takeUntil(this.destroy$),
        tap(products => console.log('products :>> ', products)),
        tap(() => setTimeout(() => this._spinnerService.setLoadingByUrl(false, this.url), 10000)),
        catchError((error, caught) => {
          setTimeout(() => this._spinnerService.setLoadingByUrl(false, this.url), 1000);
          console.log('error :>> ', error);
          console.log('caught :>> ', caught);
          return of({ error, caught });
        })
      )?.subscribe();
  }

}
