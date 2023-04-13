import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes('http://localhost:8080/user/login')) {
      return httpHandler.handle(httpRequest)
    }
    const token = localStorage.getItem('token');
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

    return httpHandler.handle(request);
  }
}
