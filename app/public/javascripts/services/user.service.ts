import { Injectable } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { User } from '../models/user';

import { ModalLoginComponent } from '../components/widgets/modal-login.component';
 
@Injectable()
export class UserService {

  public loginModal: ModalLoginComponent;

  private loginUrl = '/api/1/login';
  private signUpUrl = '/api/1/user';
  private logoutUrl = "/api/1/logout";
  private getUserUrl = "/api/1/user";
  private forgotPasswordUrl = "/api/1/user/forgot";
  private resetPasswordUrl = "/api/1/user/forgot/:token";

  private _user: User;

  // events
  public onLogin: Subject<User> = new Subject<User>();
  public onLogout: Subject<User> = new Subject<User>();

  constructor(
    private _router: Router,
    private http: Http) {
  }

  // called by app.component.ts
  init(){
    // get logged in user, then refresh it every 2 minutes
    let getUserObservable = this.getUser();
    var self = this;
    Observable.interval(2000 * 60).subscribe(x => {
      self.getUser();
    });
    return getUserObservable;
  }

  get user(): User{
    return this._user;
  }

  set user(user){
    // trigger login or logout depending on change
    if (!this._user && user)
      this.onLogin.next(user);
    if (this._user && !user)
      this.onLogout.next(user);

    this._user = user;
  }

  isLoggedIn(): boolean{
    return (this.user ? true : false);
  }

  logout(): Observable<Response> {
    var self = this;
    let observable = this.http.get(this.logoutUrl).share();
    observable.subscribe(function(response) {
      if(response.status == 200){
        self.user = null;
      }
    });
    return observable;
  }

  login(user: User, rememberMe: boolean): Observable<User> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    var self = this;
    let observable = this.http.post(
      this.loginUrl,
      JSON.stringify( Object.assign(user, {rememberMe: rememberMe}) ),
      { headers: headers }
    ).map(this.extractData)
     .share()

    observable.subscribe(function(user) {
      if (user)
        self.user = user;
    });

    return observable;
  }

  getUser(): Observable<User> {
    let observable = this.http.get(this.getUserUrl).map(this.extractData)
                                                   .share();
    var self = this;
    observable.subscribe(function(user) {
      self.user = user;
    });
    return observable;
  }

  signUp(user: User): Observable<User> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    // make call to the api
    let observable = this.http.post(
      this.signUpUrl,
      JSON.stringify(user),
      { headers: headers }
    ).map(this.extractData)
     .share();

    var self = this;
    observable.subscribe(function(user) {
      if (user)
        self.user = user;
    });

    // return the observable so the caller can subscribe and do something with the returned value
    return observable;
  }

  forgotPassword(email: string): Observable<Response> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    // make call to the api
    let observable = this.http.post(
      this.forgotPasswordUrl,
      JSON.stringify({ email: email }),
      { headers: headers }
    ).share();

    // return the observable so the caller can subscribe and do something with the returned value
    return observable;
  }

  resetPassword(token: string, password?: string): Observable<Response> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let body = (password) ? JSON.stringify( { password: password } ) : "";

    let observable = this.http.post(
      this.resetPasswordUrl.replace(":token", token), 
      body, 
      {headers: headers}
    ).share();

    var self = this;
    observable.subscribe(function(response){
      debugger;
      let resp = response.json();
      if(resp.user)
        self.user = resp.user;
    });

    return observable;
  }

  showLoginModal(callback: { (param: any): void; }) {
    this.loginModal.show();
    if(callback)
      this.loginModal.addLoginCallback(callback);
  }

  private extractData(response: Response): User {
    let body = response.json();
    let user = body.user || body;
    return User.fromJson(user);
  }

  private _triggerOnLogin(user) {
    this.onLogin.next(user);
  }

  private _triggerOnLogout(user) {
    this.onLogout.next(user);
  }
  
}
