import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { NotificationsService } from "angular2-notifications";
import { OpportunityService } from '../../services/opportunity.service';
import { UserService } from '../../services/user.service';

import { Opportunity } from '../../models/opportunity';

@Component({
  selector: 'list',
  moduleId: module.id,
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class ListComponent implements OnInit {
  opportunities: Opportunity[] = [];

  constructor(
    private opportunityService: OpportunityService,
    private notificationService: NotificationsService,
    private userService: UserService,
    private router: Router) {
    var self = this;
    let updateOpportunities = function(user) {
      self.getOpportunities();
    }
    this.userService.onLogin.subscribe(updateOpportunities);
    this.userService.onLogout.subscribe(updateOpportunities);
  }

  ngOnInit(){
    this.getOpportunities();
  }

  deleteOpportunity(opportunityToDelete) {
    let self = this;
    this.opportunityService.delete(opportunityToDelete).subscribe(
      function(response){
        let newOpportunities = self.opportunities.filter(opportunity => opportunity.id != opportunityToDelete.id);
        self.opportunities = newOpportunities;
        self.notificationService.success("Deleted",
          "Your Calculator has been deleted", { timeOut: 3000 });
      },
      function(error) {
        console.log('Got an error when trying to delete an opportunity', error);
        self.notificationService.error("Couldn't Delete",
          "Something went wrong while trying to delete that calculator."
          + " We have been notified of this issue and are working on it.");
      }
    );
  }

  getOpportunities() {
    let self = this;

    this.opportunityService.getOpportunities().subscribe(
      function(opportunities) {
        self.opportunities = opportunities;
      },
      function(error) {
        if(error.status != 403){
          console.log('Got an error while trying to get opportunities', error);
          self.notificationService.error("Couldn't load opportunities",
            "Something went wrong while trying to load your opportunities."
            + " Please try again in a few hours.");
        }
        else 
          self.opportunities = [];
      }
    );
  }
  
}
