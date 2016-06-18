import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { NotificationsService } from "angular2-notifications";
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../services/user.service';

import { Property } from '../../models/property';

@Component({
  selector: 'list',
  moduleId: module.id,
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class ListComponent {
  properties: Property[] = [];

  constructor(
    private propertyService: PropertyService,
    private notificationService: NotificationsService,
    private userService: UserService,
    private router: Router) {
    var self = this;
    let updateProperties = function(user) {
      self.getProperties();
    }
    this.userService.onLogin.subscribe(updateProperties);
    this.userService.onLogout.subscribe(updateProperties);
  }

  deleteProperty(propertyToDelete){
    let self = this;
    this.propertyService.delete(propertyToDelete).subscribe(
      function(response){
        let newProperties = self.properties.filter(property => property.id != propertyToDelete.id);
        self.properties = newProperties;
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

  getProperties() {
    let self = this;

    this.propertyService.getProperties().subscribe(
      function(properties) {
        self.properties = properties;
      },
      function(error) {
        if(error.status != 403){
          console.log('Got an error while trying to get properties', error);
          self.notificationService.error("Couldn't load properties",
            "Something went wrong while trying to load your properties."
            + " Please try again in a few hours.");
        }
        else 
          self.properties = [];
      }
    );
  }
  
}
