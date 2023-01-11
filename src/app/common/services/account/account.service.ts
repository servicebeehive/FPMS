import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public ACCESS_TOKEN: string | null;

  public get accessToken(): string | null {
    let token: string | null
    if (this.ACCESS_TOKEN) {
      token = this.ACCESS_TOKEN;
    } else {
      const local_access_token = localStorage.getItem('access-token');
      if (local_access_token) {
        this.ACCESS_TOKEN = local_access_token;
        token = this.ACCESS_TOKEN;
      } else {
        token = null
      }
    }
    return token;
  }

  constructor() { }

  public isLoggedIn(): boolean {
    return this.accessToken !== null
  }

  public addToken(request: HttpRequest<any>): HttpRequest<any> | null {
    let token: string = '';
    if (this.accessToken !== null) {
      token = this.accessToken;
    }

    if (token !== null && token.trim() !== '') {
      return request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
    }
    return request;
  }

  public setAccessToken(token?: string) {
    if (token === null) {
      this.ACCESS_TOKEN = null;
      localStorage.removeItem('access-token');
      return;
    }
    this.ACCESS_TOKEN = token;
    localStorage.setItem('access-token', token)
  }
}
