import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export default class LayoutPageComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Crear Cuenta',
        icon: 'pi pi-user-plus',
        routerLink: 'register',
      },
      {
        label: 'Iniciar Sesión',
        icon: 'pi pi-sign-in',
        routerLink: 'login',
      },
      {
        label: 'Recuperar contraseña',
        icon: 'pi pi-lock-open',
        routerLink: 'reset-password',
      }
    ];
  }
}
