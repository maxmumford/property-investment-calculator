import { Component, Input } from '@angular/core';
import {LocaleService, LocaleCurrencyPipe} from 'angular2localization/angular2localization';

@Component({
  selector: 'calculator-output',
  templateUrl: 'app/calculator-output.component.html',
  styleUrls: ['app/calculator-output.component.css'],
  pipes: [LocaleCurrencyPipe]
})
export class CalculatorOutputComponent {
  @Input()
  calculator;

  constructor(public locale: LocaleService) {
  }

  get defaultLocale(): string {
    return this.locale.getDefaultLocale();
  }

  get currency(): string {
    return this.locale.getCurrentCurrency();
  }
}
