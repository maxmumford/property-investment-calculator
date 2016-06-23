import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { FORM_PROVIDERS } from '@angular/common';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { Angulartics2 } from 'angulartics2';
import { Angulartics2Deprecated } from './Angulartics2Deprecated';

import { CookieService } from 'angular2-cookie/core';
import { LocaleService } from 'angular2localization/angular2localization';
import { OpportunityService } from './services/opportunity.service';
import { UserService } from './services/user.service';
import { NotificationsService } from "angular2-notifications";

import { AppComponent } from './components/app.component';

bootstrap(AppComponent, [
  HTTP_PROVIDERS, 
  ROUTER_PROVIDERS,
  FORM_PROVIDERS,
  provide(Angulartics2, { useClass: Angulartics2Deprecated }),
  LocaleService,
  CookieService,
  NotificationsService,
  OpportunityService,
  NotificationsService,
  UserService
]);
