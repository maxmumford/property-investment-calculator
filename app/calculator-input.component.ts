import { Component, Input } from '@angular/core';

@Component({
  selector: 'calculator-input',
  templateUrl: 'app/calculator-input.component.html'
})
export class CalculatorInputComponent {
  @Input()
  calculator;

  @Input()
  advanced;
}
