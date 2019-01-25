import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { MEAT_API } from "app/app.api";
import { User } from "./user.model";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd } from "@angular/router";

@Injectable()
export class LoginService {

  user: User
  lastUrl: string

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.router.events.filter(e=> e instanceof NavigationEnd) //filtra apenas o evento de finalização de roteamento
                      .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`, { email: email, password: password })
      .do(user => this.user = user)
  }

  logout(): void {
    this.user = undefined
  }

  isLoogedIn(): boolean {
    return this.user !== undefined
  }

  handleLogin(path: string = this.lastUrl): void {
    this.router.navigate(['/login', btoa(path)])
  }
}