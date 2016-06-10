import { Component, Input } from '@angular/core';

@Component({
  selector: 'calculator-output',
  templateUrl: 'app/calculator-output.component.html',
  styleUrls: ['app/calculator-output.component.css']
})
export class CalculatorOutputComponent {
  @Input()
  calculator;
}
