import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators } from '@angular/common';
import { EmailValidator, validateEmailFactory } from '../../validators/email-validator';
import { Response } from '@angular/http';

import { UserService } from '../../services/user.service';
import { NotificationsService } from "angular2-notifications";

import { User } from '../../models/user';

import { ModalInfoComponent } from './modal-info.component';

@Component({
  selector: 'modal-login',
  moduleId: module.id,
  templateUrl: 'modal-login.component.html',
  directives: [
    ModalInfoComponent,
    FORM_DIRECTIVES,
    EmailValidator
  ]
})
export class ModalLoginComponent {
  @ViewChild(ModalInfoComponent) modal: ModalInfoComponent;
  @Output() onLogin = new EventEmitter();
  @Output() onLogout = new EventEmitter();

  showForgotPassword: boolean = false;

  loginForm: any;
  signUpForm: any;
  forgotPasswordForm: any;

  loginError: string;
  signUpError: string;
  forgotPasswordError: string;
  forgotPasswordSuccess: string;

  // array of callables 
  // http://stackoverflow.com/questions/15670245/typescript-array-of-callbacks
  private _loginCallbacks: { (param: any): void; }[] = [];

  constructor(
    private userService: UserService,
    private notificationService: NotificationsService,
    private fb: FormBuilder) {
    // give user service reference to the login dialog 
    // so it can be shown by other components in the app
    userService.loginModal = this;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, validateEmailFactory()])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.signUpForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, validateEmailFactory()])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.forgotPasswordForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, validateEmailFactory()])]
    });
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  login(){
    // validate form and extract data
    if(!this.loginForm.dirty || !this.loginForm.valid){
      return
    }
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    // make call to api
    var self = this;
    let user = new User(email, password);
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
      let errorJson = JSON.parse(error._body);
      if (errorJson.err && errorJson.err.name == "IncorrectPasswordError") {
        self.loginError = "We weren't able to match the email and password you entered. Please check your entries and try again.";
        return;
      }
      console.log(error);
      self.notificationService.error("Couldn't Login", "There was a problem with the server while trying to login."
        + " We are aware of this issue and should have it fixed soon. Please try again in a few hours. Thanks.")
    });
  }

  signUp(){
    if (!this.signUpForm.dirty || !this.signUpForm.valid) {
      return
    }
    let email = this.signUpForm.value.email;
    let password = this.signUpForm.value.password;

    var self = this;
    let user = new User(email, password);
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
        self.notificationService.error("Duplicate Email", "An account already exists with that email address. Did you forget your password?")
        self.signUpError = "A user aleady exists with that email, please choose another one";
      }
      else{
        self.notificationService.error("Couldn't Register", "There was a problem with the server while trying to register your user."
          + " We are aware of this issue and should have it fixed soon. Please try again in a few hours. Thanks.")
      }
    });
  }

  setShowForgotPassword(forgotPassword){
    this.showForgotPassword = forgotPassword;
  }

  forgotPassword(){
    if(!this.forgotPasswordForm.dirty || !this.forgotPasswordForm.valid){
      return;
    }

    this.forgotPasswordError = '';
    this.forgotPasswordSuccess = '';

    let email = this.forgotPasswordForm.value.email;
    var self = this;

    this.userService.forgotPassword(email).subscribe(function(response: Response) {
      self.forgotPasswordSuccess = "We have sent an email to " + email + " with instructions for how to reset your password.";
    }, function(error){
      if (error.status == 404)
        self.forgotPasswordError = "Could not find a user with that email address, did you type it correctly?";
      else 
        self.forgotPasswordError = "Something went wrong when trying to reset your password. Please try again later";
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
