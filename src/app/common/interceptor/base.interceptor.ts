import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('signin') || request.url.includes('getglobalmasterdata')) {
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        })
      })
    }
    else {
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'token': localStorage.getItem('access-token'),
          'operationtype': 'LIST'
        })
      })
    }
    return next.handle(request).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
        }
      })
    );
  }
}
