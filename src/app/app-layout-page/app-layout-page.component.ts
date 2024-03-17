import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@src/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-app-layout-page',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './app-layout-page.component.html',
  styleUrl: './app-layout-page.component.scss'
})
export class AppLayoutPageComponent {

}
