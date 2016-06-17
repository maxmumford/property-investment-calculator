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

  constructor(
    private _router: Router,
    private http: Http) { 
  }

  logout() {
    localStorage.removeItem("email");
  }

  login(user: User): Observable<Response> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    // make call to the api
    let observable = this.http.post(
      this.loginUrl,
      JSON.stringify(user),
      { headers: headers }
    ).map(this.extractData)

    observable.subscribe(function(user) {
      // save the user in the localstorage
      if (user)
        localStorage.setItem("email", user.email);
    }, function(error) {
      // nothing to do here - responsibility of the caller
    });

    // return the observable so the caller can subscribe and do something with the returned value
    return observable;
  }

  register(user: User): Observable<Response> {
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

  private extractData(response: Response) {
    let body = response.json();
    let user = body.user || body;
    return user;
  }

  getUser(): User {
    let email = localStorage.getItem("email");
    if (email)
      return new User(email, "");
    else
      return null;
  }

  enforceLogin() {
    if (localStorage.getItem("email") === null) {
      this._router.navigate(['Home']);
    }
  }

}
