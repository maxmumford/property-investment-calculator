import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

var ICONS = {
  "text": "A",
  "number": "#",
  "percent": "%",
  "currency": "£",
}

@Component({
  selector: 'widget-calculator-input',
  templateUrl: 'app/widgets/widget-calculator-input.component.html',
  directives: [ TOOLTIP_DIRECTIVES ]
})
export class WidgetCalculatorInputComponent implements OnInit {
  @Input() label : string;
  @Input() type : string;
  @Input() tooltip : string;
  @Input() model: any;
  @Input() min : number;
  @Input() max : number;
  @Input() step : number;

  @Output() modelChange: any = new EventEmitter();
  inputSymbol;

  updateData(event) {
    this.model = event;
    this.modelChange.emit(event);
  }

  ngOnInit() { 
    // dynamically set inputSymbol
    this.inputSymbol = ICONS[this.type];

    if( this.type == "percent" ) {
      this.type = "number";
      this.max = 100;
      this.min = 0;
    }
    else if( this.type == "currency" ){
      this.type = "number";
    }
  }
}
