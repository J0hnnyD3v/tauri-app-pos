import { Component } from '@angular/core';
import { ProductsComponent } from '@src/check-in/components/products/products.component';
import { SearchComponent } from '@src/check-in/components/search/search.component';

@Component({
  selector: 'app-check-in-page',
  standalone: true,
  imports: [SearchComponent, ProductsComponent],
  templateUrl: './check-in-page.component.html',
  styleUrl: './check-in-page.component.scss'
})
export default class CheckInPageComponent {

}
