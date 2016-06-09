import { Component, Input } from '@angular/core';

@Component({
  selector: 'calculator-output',
  templateUrl: 'app/calculator-output.component.html'
})
export class CalculatorOutputComponent {
  @Input()
  calculator;

  @Input()
  advanced;
}
