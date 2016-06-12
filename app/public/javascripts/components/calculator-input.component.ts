import { Component, Input } from '@angular/core';

import { WidgetCalculatorInputComponent } from './widgets/widget-calculator-input.component';
import { WidgetCalculatorRadioComponent } from './widgets/widget-calculator-radio.component';

@Component({
  selector: 'calculator-input',
  moduleId: module.id,
  templateUrl: 'calculator-input.component.html',
  styleUrls: ['calculator-input.component.css'],
  directives: [ WidgetCalculatorInputComponent, WidgetCalculatorRadioComponent ]
})
export class CalculatorInputComponent {
  @Input() calculator;
}
