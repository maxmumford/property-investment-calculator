import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { Response } from '@angular/http';

import { CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { Calculator } from '../../models/calculator';
import { Opportunity } from '../../models/opportunity';
import { OpportunityService } from '../../services/opportunity.service';
import { UserService } from '../../services/user.service';
import { NotificationsService } from "angular2-notifications";

import { CalculatorInputComponent } from '../calculator/calculator-input.component';
import { CalculatorOutputComponent } from '../calculator/calculator-output.component';
import { CalculatorControlsComponent } from '../calculator/calculator-controls.component';
import { ModalConfirmComponent } from '../widgets/modal-confirm.component';

import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'calculator',
  moduleId: module.id,
  templateUrl: 'calculator.component.html',
  directives: [
    BUTTON_DIRECTIVES,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    CalculatorInputComponent,
    CalculatorOutputComponent,
    CalculatorControlsComponent,
    ModalConfirmComponent,
    TOOLTIP_DIRECTIVES
  ],
})
export class CalculatorComponent implements OnInit {
  calculator: Calculator = null;
  opportunityId: string = null;

  constructor(
    private routeParams: RouteParams,
    private opportunityService: OpportunityService,
    private notificationService: NotificationsService,
    private userService: UserService,
    private router: Router) {

    this.opportunityId = this.routeParams.get('opportunityId') || null;

    // start with an empty calculator if no opportunity ID specified
    if (!this.opportunityId){
      this.calculator = new Calculator(this.userService);
    }

    // subscribe to logout event and redirect to home (unless public)
    var self = this;
    this.userService.onLogout.subscribe(function(user){
      if (!self.calculator.opportunity.isPublic)
        self.router.navigate(["Home"]);
    });

    // subscribe to login event and reload the calculator
    var self = this;
    this.userService.onLogin.subscribe(function(user){
      self.getCalculator();
    });
  }

  setCalculator(calculator:Calculator){
    this.calculator = calculator;
  }

  setOpportunity(opportunity: Opportunity) {
    this.calculator = new Calculator(this.userService, opportunity);
  }

  loadExampleOpportunity() {
    this.setOpportunity(this.opportunityService.exampleOpportunity());
  }

  ngOnInit() {
    this.getCalculator();
  }

  /**
   * on nginit, loads the calculator with opportunity id this.opportunityId
   * if it exists. Otherwise does nothing.
   */
  getCalculator() {
    if (this.opportunityId) {
      var self = this;
      this.opportunityService.getOpportunity(this.opportunityId).subscribe(
        opportunity => this.setOpportunity(opportunity),
        function(error: Response){
          if (error.status == 403) {
            self.notificationService.error("Not Allowed",
              "Sorry, we can't show you that calculator. It must either be made sharable"
              + " (by clicking the 'share' button in the editor), or you must be logged in"
              + " as the owner of the calculator.", {timeOut: 60000});
          }
          else if (error.status == 404) {
            self.notificationService.error("Couldn't Find The Calculator",
              "We weren't able to find the calculator that your link points to."
              + " Maybe it has been deleted?");
          }
          else {
            console.log('Got an error when trying to get an opportunity', error);
            self.notificationService.error("Whoops, something went wrong",
              "Something misfired and we're all 1's and 0's..."
              + "We know about this error and are workin on it. Please try again in a few hours.");
          }
        }
      );
    }
  }
}
