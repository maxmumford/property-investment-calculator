import { Injectable } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Headers, Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { User } from '../models/user';

import { ModalLoginComponent } from '../components/widgets/modal-login.component';
 
@Injectable()
export class UserService {

  loginModal: ModalLoginComponent;

  loginUrl = '/api/1/login';
  registerUrl = '/api/1/user';
  logoutUrl = "/api/1/logout";
  getUserUrl = "/api/1/user";

  user: User;

  constructor(
    private _router: Router,
    private http: Http) { 
  }

  logout(): Observable<Response> {
    let observable = this.http.get(this.logoutUrl);
    observable.subscribe(function(response) {
      if(response.status == 200){
        this.user = null;
      }
    });
    return observable;
  }

  login(user: User): Observable<User> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let observable = this.http.post(
      this.loginUrl,
      JSON.stringify(user),
      { headers: headers }
    ).map(this.extractData)

    observable.subscribe(function(user) {
      if (user)
        this.user = user;
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

  getUser(): Observable<User> {
    let observable = this.http.get(this.getUserUrl).map(this.extractData);
    var self = this;
    observable.subscribe(function(user) {
      if (user)
        self.user = user;
    });

    return observable;
  }

}
