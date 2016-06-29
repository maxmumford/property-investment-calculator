import { Component, Input } from '@angular/core';
import { LocaleService, LocaleCurrencyPipe } from 'angular2localization/angular2localization';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { CalculatorInputComponent } from './calculator-input.component';

@Component({
  selector: 'calculator-output',
  moduleId: module.id,
  templateUrl: 'calculator-output.component.html',
  styleUrls: ['calculator-output.component.css'],
  directives: [TOOLTIP_DIRECTIVES],
  pipes: [LocaleCurrencyPipe]
})
export class CalculatorOutputComponent {
  @Input() calculator;

  constructor(public locale: LocaleService) {
  }

  get defaultLocale(): string {
    return this.locale.getDefaultLocale();
  }

  get currency(): string {
    return this.locale.getCurrentCurrency();
  }
}
