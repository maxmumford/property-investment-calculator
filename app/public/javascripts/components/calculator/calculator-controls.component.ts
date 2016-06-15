import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Calculator } from '../../models/calculator';
import { Property } from '../../models/property';

@Component({
  selector: 'calculator-controls',
  moduleId: module.id,
  templateUrl: 'calculator-controls.component.html'
})
export class CalculatorControlsComponent {
  @Input() calculator;
  @Output('calculator') calculatorChange: any = new EventEmitter();

  constructor() {
  }

  save(){
    console.log('saving');
  }

  reset(){
    console.log('resetting');
    this.calculator = new Calculator(new Property(), this.calculator.advanced);
    this.calculatorChange.emit(this.calculator);
  }

}
