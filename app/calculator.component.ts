import { Component, OnInit } from '@angular/core';
import { Calculator } from './calculator';
import { CalculatorInputComponent } from './calculator-input.component';
import { CalculatorOutputComponent } from './calculator-output.component';

@Component({
  selector: 'calculator',
  templateUrl: 'app/calculator.component.html',
  directives: [CalculatorInputComponent, CalculatorOutputComponent],
})
export class CalculatorComponent {
  advanced = false;
  constructor (){
    this.calculator = new Calculator();
  }
}
