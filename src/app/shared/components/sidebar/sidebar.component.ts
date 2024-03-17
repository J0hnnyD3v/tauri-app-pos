import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID, OnInit, ViewChild, inject } from '@angular/core';
import { primengModules } from '@src/primeng-modules';
import { Sidebar } from 'primeng/sidebar';
import { map, share, takeUntil, tap, timer } from 'rxjs';
import { CommonComponent } from '../common.component';
import { Router } from '@angular/router';
// import { timer } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ...primengModules],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX'}]
})
export class SidebarComponent extends CommonComponent implements OnInit {
  private _router = inject(Router);

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  rxTime = new Date();

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;

  ngOnInit() {
    timer(0, 1000)
    .pipe(
      takeUntil(this.destroy$),
      map(() => new Date()),
      share(),
      tap(time => this.rxTime = time),
    ).subscribe();
  }

  logout() {
    this._router.navigateByUrl('/auth/login');
  }

}

