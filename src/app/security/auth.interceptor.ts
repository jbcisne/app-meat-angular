import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  //usa o injector para corrigir erro de dependencia ciclica ao utilizar o loginService no construtor
  constructor(private injector: Injector) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loginService: LoginService = this.injector.get(LoginService)
    if (loginService.isLoogedIn()) {
      let authRequest = request.clone({
        setHeaders: { 'Authorization': `Bearer ${loginService.user.accessToken}` }
      })
      return next.handle(authRequest)
    } else {
      return next.handle(request)  
    }
  }
}