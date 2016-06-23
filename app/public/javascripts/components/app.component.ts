// enable prod mode?
import { enableProdMode } from '@angular/core';
interface AppWindow extends Window {
  production: boolean;
}
declare var window: AppWindow;
if (window.production)
  enableProdMode();

import { Component, AfterViewInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';

import 'jquery';
import 'bootstrap-js';

import { Angulartics2 } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';

import { CookieService } from 'angular2-cookie/core';
import { LocaleService } from 'angular2localization/angular2localization';
import { NotificationsService, SimpleNotificationsComponent } from "angular2-notifications";
import { UserService } from "../services/user.service";

import { User } from "../models/user";

import { ListComponent } from './pages/list.component';
import { CalculatorComponent } from './pages/calculator.component';
import { ResetPasswordComponent } from './pages/reset-password.component';
import { TermsComponent } from './pages/terms.component';
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
  },
  {
    path: '/boring-legal-mumbo-jumbo',
    name: 'Terms',
    component: TermsComponent
  }
])
@Component({
  selector: 'app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  providers: [ Angulartics2GoogleAnalytics ],
  directives: [
    ROUTER_DIRECTIVES,
    SimpleNotificationsComponent,
    ModalLoginComponent
  ]
})
export class AppComponent implements AfterViewInit {
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
    private cookieService: CookieService,
    private privateviewContainerRef: ViewContainerRef,
    private userService: UserService,
    private notificationService: NotificationsService,
    private angulartics2: Angulartics2, 
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {

    this.viewContainerRef = privateviewContainerRef;
    this.locale.definePreferredLocale('en', 'GB');
    this.locale.definePreferredCurrency('GBP');
  }

  ngAfterViewInit() {
    if (!this.cookieService.get('disclaimed')) {
      this.notificationService.html(`
        <div class="title">Disclaimer</div>
        <div class="content">
          By using this app you agree to our disclaimer and cookie policy.
        </div>
        <a href="/boring-legal-mumbo-jumbo" class="btn btn-default">
          <span class="glyphicon glyphicon-info-sign"></span>
          More Info
        </a>
        `, "info", { timeOut: 20000 });
      let expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 62 /* 2 months from now */);
      this.cookieService.put('disclaimed', 'True on ' + new Date(), { expires: expiryDate });
    }
  }

  get user(): User{
    return this.userService.user;
  }

  logout(){
    var self = this;
    this.userService.logout().subscribe(function(resopnse){
      self.notificationService.success("Logged Out", "You've been logged out, see you soon!")
    });
  }

}
