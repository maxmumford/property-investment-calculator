import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { Calculator } from '../../models/calculator';
import { Opportunity } from '../../models/opportunity';
import { OpportunityService } from '../../services/opportunity.service';
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
    private notificationService: NotificationsService) {
    // start with an empty calculator
    this.opportunityId = this.routeParams.get('opportunityId') || null;
    if (!this.opportunityId)
      this.calculator = new Calculator();
  }

  setCalculator(calculator:Calculator){
    this.calculator = calculator;
  }

  setOpportunity(opportunity: Opportunity) {
    this.calculator = new Calculator(opportunity);
  }

  loadExampleOpportunity() {
    this.setOpportunity(this.opportunityService.exampleOpportunity());
  }

  ngOnInit() {
    if (this.opportunityId) {
      this.opportunityService.getOpportunity(this.opportunityId)
        .subscribe(
        opportunity => this.setOpportunity(opportunity),
          function(error){
            console.log('Got an error when trying to get an opportunity', error);
            this.notificationService.error("Couldn't Find The Calculator", 
              "We weren't able to find the calculator that your link points to."
              + " Maybe it has been deleted?");
          }
        );
    }
  }
}
