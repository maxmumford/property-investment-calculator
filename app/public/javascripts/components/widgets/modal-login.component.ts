import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/common';

import { UserService } from '../../services/user.service';
import { NotificationsService } from "angular2-notifications";

import { User } from '../../models/user';

import { ModalInfoComponent } from './modal-info.component';

@Component({
  selector: 'modal-login',
  moduleId: module.id,
  templateUrl: 'modal-login.component.html',
  directives: [ModalInfoComponent, NgForm]
})
export class ModalLoginComponent {
  @ViewChild(ModalInfoComponent) modal: ModalInfoComponent;
  @Output() onLogin = new EventEmitter();
  @Output() onLogout = new EventEmitter();

  loginUsername: string = "max";
  loginPassword: string = "781871ui";
  loginError: string;

  registerUsername: string;
  registerPassword: string;
  registerError: string;

  // array of callables 
  // http://stackoverflow.com/questions/15670245/typescript-array-of-callbacks
  private _loginCallbacks: { (param: any): void; }[] = [];

  constructor(
    private userService: UserService,
    private notificationService: NotificationsService) {
    userService.loginModal = this;
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  login(){
    var self = this;
    let user = new User(this.loginUsername, this.loginPassword);
    this.userService.login(user).subscribe(function(user){
      if (user) {
        self._onLogin(user);
        self.notificationService.success("Logged In", "You've been logged in, welcome back :)");
      }
      else {
        self.loginError = "Looks like those login details were incorrect; please try again";
        self.notificationService.error("Couldn't log in", "Those login details are not correct I'm afraid, please try again")  
      }
    }, function(error){
      console.log(error);
      self.notificationService.error("Couldn't Login", "There was a problem with the server while trying to login."
        + " We are aware of this issue and should have it fixed soon. Please try again in a few hours. Thanks.")
    });
    
  }

  register(){
    var self = this;
    let user = new User(this.registerUsername, this.registerPassword);
    this.userService.register(user).subscribe(function(user) {
      if (user) {
        self._onLogin(user);
        self.notificationService.success("Registered and Logged In", 
          "Welcome! You've been registered and logged in. Let's get to work!")
      }
      else {
        self.loginError = "Looks like those login details were incorrect; please try again";
        self.notificationService.error("Couldn't log in", "Those login details are not correct I'm afraid, please try again")
      }
    }, function(error) {
      console.log(error);
      let errorJson = JSON.parse(error._body);
      if (errorJson.err && errorJson.err.name == "UserExistsError") {
        self.notificationService.error("Duplicate Username", "A user already exists with that username, please try another one")
        self.registerError = "A user aleady exists with that username, please choose another one";
      }
      else{
        self.notificationService.error("Couldn't Register", "There was a problem with the server while trying to register your user."
          + " We are aware of this issue and should have it fixed soon. Please try again in a few hours. Thanks.")
      }
    });
  }

  // add login callback to the collection
  addLoginCallback(callback: { (param: any): void; }) {
    this._loginCallbacks.push(callback);
  }

  private _onLogin(user){
    this.onLogin.emit(user);
    this.triggerLoginCallbacks(user);
    this.hide();
  }

  // call all login callbacks
  private triggerLoginCallbacks(user: any){
    for (var i = this._loginCallbacks.length - 1; i >= 0; i--) {
      this._loginCallbacks[i](user);
    }
    // delete all callbacks
    this._loginCallbacks = [];
  }

}
