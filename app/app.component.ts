import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { ListComponent } from './list.component';
import { CalculatorComponent } from './calculator.component';

@RouteConfig([
  {
    path: '/list',
    name: 'List',
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
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['List']">List</a>
      <a [routerLink]="['Calculator']">Calculator</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES, AlertComponent],
  providers: [
    ROUTER_PROVIDERS
  ]
})
export class AppComponent {
  title = 'Property Investment Calculator';
}
