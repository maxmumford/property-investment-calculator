import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Angulartics2} from 'angulartics2';

@Injectable()
export class Angulartics2Deprecated extends Angulartics2 {
  constructor(location: Location, router: Router) {
    super(location);
    this.trackRouter(location, router);
  }

  trackRouter(location: Location, router: Router) {
    router.subscribe((value: any) => {
      let url = location.path();
      this.trackUrlChange(url, location);
    });
  }
}
