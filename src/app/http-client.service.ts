import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './dashboard/services/loader.service';

@Injectable()
export class HttpClientService implements HttpInterceptor  {

  constructor(public  loader: LoaderService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('inside http');
    this.loader.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(() => {
        () => {
          this.loader.isLoading.next(false);
        };
      })
    );
  }
}
