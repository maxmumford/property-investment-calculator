import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { BUTTON_DIRECTIVES, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { Calculator } from '../../models/calculator';
import { Property } from '../../models/property';
import { PropertyService } from '../../services/property.service';
import { NotificationsService } from "angular2-notifications";

import { CalculatorInputComponent } from '../calculator/calculator-input.component';
import { CalculatorOutputComponent } from '../calculator/calculator-output.component';
import { CalculatorControlsComponent } from '../calculator/calculator-controls.component';
import { ModalConfirmComponent } from '../widgets/modal-confirm.component';

@Component({
  selector: 'calculator',
  moduleId: module.id,
  templateUrl: 'calculator.component.html',
  directives: [
    BUTTON_DIRECTIVES,
    TOOLTIP_DIRECTIVES,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    CalculatorInputComponent,
    CalculatorOutputComponent,
    CalculatorControlsComponent,
    ModalConfirmComponent
  ],
})
export class CalculatorComponent implements OnInit {
  calculator: Calculator;
  propertyId: string = null;

  constructor(
    private routeParams: RouteParams,
    private propertyService: PropertyService,
    private notificationService: NotificationsService) {
    // start with an empty calculator
    this.calculator = new Calculator();
    this.propertyId = this.routeParams.get('propertyId');
  }

  setCalculator(calculator:Calculator){
    this.calculator = calculator;
  }

  setProperty(property:Property){
    this.calculator = new Calculator(property, this.calculator.advanced);
  }

  loadExampleProperty(){
    this.setProperty(this.propertyService.exampleProperty());
  }

  ngOnInit() {
    if (this.propertyId) {
      this.propertyService.getProperty(this.propertyId)
        .subscribe(
          property => this.setProperty(property),
          function(error){
            console.log('Got an error when trying to get a property', error);
            this.notificationService.error("Couldn't Find The Property", 
              "We weren't able to find the property that your link points to."
              + " Maybe it has been deleted.");
          }
        );
    }
  }
}
