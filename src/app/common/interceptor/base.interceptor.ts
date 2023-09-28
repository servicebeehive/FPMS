import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor(public loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    if (request.url.includes('signin') || request.url.includes('getglobalmasterdata')) {
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        })
      })
    }
    else if (request.url.includes('labouroperation')) {
      const labordata=request.body
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'token': localStorage.getItem('access-token'),
           }),
        body:labordata.body
      })
      
    }
    else if (request.url.includes('stateprojectsummarydata')) {
      console.log(request)
      const headerData = JSON.parse(request.headers.get("data"));
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'token': localStorage.getItem('access-token'),
          'operationtype': 'LIST',
          'projectheaderid': String(headerData.projectheaderid),

        })
      })
    }
    else if (request.url.includes('getprojectuploadapprovalfile')) {
      const headerData = JSON.parse(request.headers.get("data"));
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          // "Content-Type": "application/json",
          'token': localStorage.getItem('access-token'),
          'projectheadid': String(headerData.projectheadid),
        })
      })
    }

    else if (request.url.includes('getprojectinfodetails') || request.url.includes('projectsummarydata')) {
      const headerData = JSON.parse(request.headers.get("data"));
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'token': localStorage.getItem('access-token'),
          'operationtype': 'LIST',
          'projectheadid': String(headerData.projectheadid),

        })
      })
    }
   
 
    else if (request.url.includes('getprojectheaderdata')) {
      const headerData = JSON.parse(request.headers.get("data"));
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          'token': localStorage.getItem('access-token'),
          'projectheaderid': String(headerData.projectheadid),
        })
      })
    }

    else if (request.url.includes('getstateprojectdata')) {
      const headerData = JSON.parse(request.headers.get("data"));
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          'token': localStorage.getItem('access-token'),
          'statetaskcategoryid': String(headerData.statetaskcategoryid),
        })
      })
    }

    else if (request.url.includes('getstateprojecttskdata')) {
      const headerData = JSON.parse(request.headers.get("data"));
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          'token': localStorage.getItem('access-token'),
          'statetaskid': String(headerData.statetaskid),
          'totalarea': String(headerData.totalarea)
        })
      })
    }

    else if (request.url.includes('getprojectcomponentdetailbyyear')) {
      const headerData = JSON.parse(request.headers.get("data"));
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'token': localStorage.getItem('access-token'),
          'operationtype': 'LIST',
          'projectheadid': String(headerData.projectheadid),
          'projectcomponentyear': headerData.projectcomponentyear

        })
      })
    }
    else {
      request = request.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'token': localStorage.getItem('access-token'),
          'operationtype': 'LIST',

        })
      })
    }
    return next.handle(request).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
        }
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
