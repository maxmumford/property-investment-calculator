import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { NotificationsService } from "angular2-notifications";
import { PropertyService } from '../../services/property.service';

import { Property } from '../../models/property';

@Component({
  selector: 'list',
  moduleId: module.id,
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class ListComponent implements OnInit {
  properties: Property[] = null;

  constructor(
    private propertyService: PropertyService,
    private notificationService: NotificationsService,
    private router: Router) {
  }

  setProperties(properties){
    this.properties = properties;
  }

  ngOnInit(){
    let self = this;
    this.propertyService.getProperties().subscribe(
      properties => this.setProperties(properties),
      function(error) {
        console.log('Got an error when trying to get properties', error);
        self.notificationService.error("Couldn't Load Properties",
          "Something went wrong while trying to load the property list."
          + " We have been notified of this issue and are working on it.");
      }
    );
  }

  deleteProperty(propertyToDelete){
    let self = this;
    this.propertyService.delete(propertyToDelete).subscribe(
      function(response){
        let newProperties = self.properties.filter(property => property.id != propertyToDelete.id);
        self.setProperties(newProperties);
        self.notificationService.success("Deleted",
          "Your property has been deleted", {timeOut: 3000});
      },
      function(error) {
        console.log('Got an error when trying to delete a property', error);
        self.notificationService.error("Couldn't Delete",
          "Something went wrong while trying to delete that property."
          + " We have been notified of this issue and are working on it.");
      }
    );
  }
}
