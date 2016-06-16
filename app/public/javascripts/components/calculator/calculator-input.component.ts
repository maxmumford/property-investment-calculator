import { Component, Input, ViewChild } from '@angular/core';
import { FORM_DIRECTIVES, Control, Validators, ControlGroup } from '@angular/common';

import { WidgetCalculatorInputComponent } from './widgets/widget-calculator-input.component';
import { WidgetCalculatorRadioComponent } from './widgets/widget-calculator-radio.component';


@Component({
  selector: 'calculator-input',
  moduleId: module.id,
  templateUrl: 'calculator-input.component.html',
  styleUrls: ['calculator-input.component.css'],
  directives: [ 
    WidgetCalculatorInputComponent, 
    WidgetCalculatorRadioComponent,
    FORM_DIRECTIVES
  ]
})
export class CalculatorInputComponent {
  @Input() calculator;

  calculatorFormGroup = new ControlGroup({
    name: new Control("", Validators.required)
  });

  formValid(){
    return this.calculatorFormGroup.valid;
  }

}
