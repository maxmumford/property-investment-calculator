import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import 'rxjs/add/operator/catch';

import { LocaleService } from 'angular2localization/angular2localization';
import { NotificationsService, SimpleNotificationsComponent } from "angular2-notifications";

import { ListComponent } from './pages/list.component';
import { CalculatorComponent } from './pages/calculator.component';

@RouteConfig([
  {
    path: '/',
    name: 'Home',
    component: ListComponent
  },
  {
    path: '/calculator/:propertyId',
    name: 'CalculatorLoad',
    component: CalculatorComponent
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: CalculatorComponent
  }
])
@Component({
  selector: 'app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  directives: [
    ROUTER_DIRECTIVES,
    SimpleNotificationsComponent
  ]
})
export class AppComponent {
  title = 'Property Investment Calculator';
  notificationOptions = {
    timeOut: 100000,
    preventLastDuplicates: 'visible'
  };

  constructor(
    public locale: LocaleService
  ) {
    this.locale.definePreferredLocale('en', 'GB');
    this.locale.definePreferredCurrency('GBP');
  }
}
