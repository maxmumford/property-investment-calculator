import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { NotificationsService } from "angular2-notifications";
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'list',
  moduleId: module.id,
  templateUrl: 'list.component.html',
  directives: [ ROUTER_DIRECTIVES ]
})
export class ListComponent implements OnInit {
  properties;

  constructor(
    private propertyService: PropertyService,
    private notificationService: NotificationsService,
    private router: Router) {
  }

  setProperties(properties){
    this.properties = properties;
  }

  ngOnInit(){
    this.propertyService.getProperties().subscribe(
      properties => this.setProperties(properties),
      function(error) {
        console.log('Got an error when trying to get properties', error);
        this.notificationService.error("Couldn't Load Properties",
          "Something went wrong while trying to load the property list."
          + " We have been notified of this issue and are working on it.");
      }
    );
  }
}
