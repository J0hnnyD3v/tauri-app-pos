import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);

  login(email: string, password: string) {
    return this._http.post(`${environment.apiUrl}/login`, { email, password });
  }
}
