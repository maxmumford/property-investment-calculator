import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { LocaleService } from 'angular2localization/angular2localization';
import { PropertyService } from './services/property.service';
import { NotificationsService } from "angular2-notifications";

import { AppComponent } from './components/app.component';

bootstrap(AppComponent, [
  HTTP_PROVIDERS, ROUTER_PROVIDERS,
  LocaleService,
  NotificationsService,
  PropertyService,
  NotificationsService
]);
