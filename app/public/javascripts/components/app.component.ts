import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {LocaleService} from 'angular2localization/angular2localization';

import { ListComponent } from './list.component';
import { CalculatorComponent } from './calculator.component';

@RouteConfig([
  {
    path: '/',
    name: 'Home',
    component: ListComponent
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: CalculatorComponent
  },
])
@Component({
  selector: 'app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS, 
    LocaleService
  ]
})
export class AppComponent {
  title = 'Property Investment Calculator';
  constructor(public locale: LocaleService) {
    this.locale.definePreferredLocale('en', 'GB');
    this.locale.definePreferredCurrency('GBP');
  }
}
