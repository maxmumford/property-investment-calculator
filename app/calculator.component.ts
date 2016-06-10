import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { Calculator } from './calculator';
import { CalculatorInputComponent } from './calculator-input.component';
import { CalculatorOutputComponent } from './calculator-output.component';

@Component({
  selector: 'calculator',
  templateUrl: 'app/calculator.component.html',
  directives: [BUTTON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, CalculatorInputComponent, CalculatorOutputComponent],
})
export class CalculatorComponent {
  advanced = "";
  constructor (){
    this.calculator = new Calculator();
  }
}
