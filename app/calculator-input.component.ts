import { Component, Input } from '@angular/core';

import { WidgetCalculatorInputComponent } from './widgets/widget-calculator-input.component';
import { WidgetCalculatorRadioComponent } from './widgets/widget-calculator-radio.component';

@Component({
  selector: 'calculator-input',
  templateUrl: 'app/calculator-input.component.html',
  directives: [ WidgetCalculatorInputComponent, WidgetCalculatorRadioComponent ]
})
export class CalculatorInputComponent {
  @Input() calculator;
}
