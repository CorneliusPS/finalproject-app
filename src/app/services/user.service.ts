import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IData, IDataResponse, ISignin, IToken } from '../interfaces/i-signin';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;
  baseUrl: string = environment.baseUrl;
  keyToken: string = 'Token';

  constructor(private http: HttpClient) {}
  signIn(user: ISignin): Observable<IDataResponse> {
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify(user);

    return this.http.post<IDataResponse>(
      `${this.baseUrl}/api/auth0/login/v1`,
      body,
      {
        headers,
      }
    );
  }
  setAuthentication(response: IData) {
    localStorage.setItem(this.keyToken, response.token);
    this.isLoggedIn = true;
  }

  isAuthenticate(): boolean {
    if (localStorage.getItem(this.keyToken)) {
      this.isLoggedIn = true;
      return this.isLoggedIn;
    }
    return false;
  }
  getToken(): string {
    return localStorage.getItem(this.keyToken) || '';
  }

  logout() {
    localStorage.removeItem(this.keyToken);
    this.isLoggedIn = false;
  }
}
