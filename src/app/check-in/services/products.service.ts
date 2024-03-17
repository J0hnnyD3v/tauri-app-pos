import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _http = inject(HttpClient);

  getAllProducts() {
    return this._http.get<any>(`${environment.apiUrl}/products`);
  }
}
