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
  private registerUrl = '/api/1/user';
  private logoutUrl = "/api/1/logout";
  private getUserUrl = "/api/1/user";

  private _user: User;

  // events
  public onLogin: Subject<User> = new Subject<User>();
  public onLogout: Subject<User> = new Subject<User>();

  constructor(
    private _router: Router,
    private http: Http) {

    // get logged in user, then refresh it every 2 minutes
    this.getUser();
    var self = this;
    Observable.interval(2000 * 60).subscribe(x => {
      self.getUser();
    });
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

  logout(): Observable<Response> {
    var self = this;
    let observable = this.http.get(this.logoutUrl);
    observable.subscribe(function(response) {
      if(response.status == 200){
        self.user = null;
      }
    });
    return observable;
  }

  login(user: User): Observable<User> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    var self = this;
    let observable = this.http.post(
      this.loginUrl,
      JSON.stringify(user),
      { headers: headers }
    ).map(this.extractData)

    observable.subscribe(function(user) {
      if (user)
        self.user = user;
    });

    return observable;
  }

  getUser(): Observable<User> {
    let observable = this.http.get(this.getUserUrl).map(this.extractData);
    var self = this;
    observable.subscribe(function(user) {
      console.log(user);
      if (user)
        self.user = user;
    });
    return observable;
  }

  register(user: User): Observable<User> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    // make call to the api
    let observable = this.http.post(
      this.registerUrl,
      JSON.stringify(user),
      { headers: headers }
    ).map(this.extractData)

    // return the observable so the caller can subscribe and do something with the returned value
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
