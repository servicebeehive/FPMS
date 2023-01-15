import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('signin') || request.url.includes('getglobalmasterdata')) {
      request = request.clone({
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        })
      })
    }
    else {
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwidXNlcnJvbGUiOiJERk8iLCJpYXQiOjE2NzIzOTc0MDR9.BOeMGi06bhq_gkolb05w-z7mPN3T9QcRId4EHlMkpSM",
        }
      })
    }
    console.log("request", request)
    return next.handle(request);
  }
}
