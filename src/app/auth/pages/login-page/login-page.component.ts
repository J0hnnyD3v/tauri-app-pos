import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { delay, takeUntil, tap } from 'rxjs';

import { primengModules } from '@src/primeng-modules';

import { SpinnerService } from '@shared/services/spinner.service';

import { CommonComponent } from '@shared/components/common.component';

import { ISpinner } from '@shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...primengModules],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export default class LoginPageComponent extends CommonComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _spinnerService = inject(SpinnerService);
  private _router = inject(Router);

  isRequesting = signal(false);
  url = 'LoginPageComponent';
  fg: FormGroup = this._fb.group({
    username: ['', [Validators.email]],
    password: ['', [Validators.maxLength(255)]],
  });

  ngOnInit(): void {
    this._spinnerService.loadingByUrl$
      ?.pipe(
        takeUntil(this.destroy$),
        delay(0), // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
        tap(values => console.log('values :>> ', values)),
        tap((values: ISpinner[]) => this.isRequesting.update(v => values.some(v => v.url === this.url) ? true : false)),
      )?.subscribe();
  }

  /* form validations */
  public get invalidUsername(): WritableSignal<boolean | undefined> {
    return signal(this.fg.get('username')?.invalid && this.fg.get('username')?.dirty);
  }


  onSubmit() {
    this.fg.markAllAsTouched();
    // if (this.fg.invalid || this.fg.get('username')?.value === '') {
    //   return;
    // }

    // const payload: ILoginCredentials = {
    // const payload: any = {
    //   username: this.fg.get('username')?.value || '',
    //   password: this.fg.get('password')?.value || '',
    // }

    this._spinnerService.setLoadingByUrl(true, this.url);
    setTimeout(() => {
      this._spinnerService.setLoadingByUrl(false, this.url);
      this._router.navigateByUrl('/app')
    }, 5000);

    // this._spinnerService.setLoadingByUrl(true, this.url);
    // this._authService.signInWithCredentials(payload)
    //   ?.pipe(
    //     takeUntil(this.destroy$),
    //     tap(response => console.log('response :>> ', response)),
    //     switchMap(() => this._authService.validateUser()),
    //     tap(response => console.log('response :>> ', response, JSON.stringify(response))),
    //     tap(response => this._cookieService.set('logged-in', JSON.stringify(response))),
    //     switchMap(() => this._sidebarService.getMenu()),
    //     tap(menu => console.log('menu :>> ', menu)),
    //     tap((menuItems: any[]) => {
    //       localStorage.setItem('current-page', '085a56ee-1955-4d99-8f49-1c34300880ea');
    //       sessionStorage.setItem('menuItems', JSON.stringify(menuItems));
    //       let url = '';
    //       if (menuItems?.length) {
    //         // const menu: IMenuItem = menuItems?.find(m => m.isVisible);
    //         const menu: any = menuItems?.find(m => m.isVisible);
    //         if (!menu) {
    //           url = '/app/dashboard'
    //         } else {
    //           url = `/app${menu.path}`;
    //         }
    //       }
    //       const returnUrl = localStorage.getItem('returnUrl') || url;
    //       console.log('returnUrl :>> ', returnUrl);
    //       this._router.navigateByUrl(returnUrl);
    //     }),
    //     tap(() => setTimeout(() => this._spinnerService.setLoadingByUrl(false, this.url), 1000)),
    //     catchError((error, caught) => {
    //       setTimeout(() => this._spinnerService.setLoadingByUrl(false, this.url), 100000);
    //       console.log('error :>> ', error);
    //       console.log('caught :>> ', caught);
    //       return of({ error, caught });
    //     })
    //   )?.subscribe();
  }

}
