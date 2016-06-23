// enable prod mode?
import { enableProdMode } from '@angular/core';
interface AppWindow extends Window {
  production: boolean;
}
declare var window: AppWindow;
if (window.production)
  enableProdMode();

import { Component, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';

import 'jquery';
import 'bootstrap-js';

import { Angulartics2 } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';

import { LocaleService } from 'angular2localization/angular2localization';
import { NotificationsService, SimpleNotificationsComponent } from "angular2-notifications";
import { UserService } from "../services/user.service";

import { User } from "../models/user";

import { ListComponent } from './pages/list.component';
import { CalculatorComponent } from './pages/calculator.component';
import { ResetPasswordComponent } from './pages/reset-password.component';
import { ModalLoginComponent } from './widgets/modal-login.component';

@RouteConfig([
  {
    path: '/',
    name: 'Home',
    component: ListComponent
  },
  {
    path: '/calculator/:opportunityId',
    name: 'CalculatorLoad',
    component: CalculatorComponent
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: CalculatorComponent
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPasswordComponent
  }
])
@Component({
  selector: 'app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  directives: [
    ROUTER_DIRECTIVES,
    SimpleNotificationsComponent,
    ModalLoginComponent
  ]
})
export class AppComponent {
  title = 'Property Investment Calculator';
  viewContainerRef;
  @ViewChild(ModalLoginComponent) loginModal: ModalLoginComponent;
  production: boolean;
  
  notificationOptions = {
    timeOut: 10000,
    preventLastDuplicates: 'visible'
  };

  constructor(
    public locale: LocaleService,
    private privateviewContainerRef: ViewContainerRef,
    private userService: UserService,
    private notificaionService: NotificationsService,
    private angulartics2: Angulartics2, 
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {

    this.viewContainerRef = privateviewContainerRef;
    this.locale.definePreferredLocale('en', 'GB');
    this.locale.definePreferredCurrency('GBP');
  }

  get user(): User{
    return this.userService.user;
  }

  logout(){
    var self = this;
    this.userService.logout().subscribe(function(resopnse){
      self.notificaionService.success("Logged Out", "You've been logged out, see you soon!")
    });
  }

}
