import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'widget-calculator-radio',
  moduleId: module.id,
  templateUrl: 'widget-calculator-radio.component.html',
  directives: [ TOOLTIP_DIRECTIVES, BUTTON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ]
})
export class WidgetCalculatorRadioComponent implements OnInit {
  @Input() label : string;
  @Input() options : Array<any>;
  @Input() tooltip : string;
  @Input() model: any;
  @Output() modelChange: any = new EventEmitter();

  updateData(event) {
    this.model = event;
    this.modelChange.emit(event);
  }

  ngOnInit() { 
  }

}
