"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var widget_calculator_input_component_1 = require('./widgets/widget-calculator-input.component');
var widget_calculator_radio_component_1 = require('./widgets/widget-calculator-radio.component');
var CalculatorInputComponent = (function () {
    function CalculatorInputComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalculatorInputComponent.prototype, "calculator", void 0);
    CalculatorInputComponent = __decorate([
        core_1.Component({
            selector: 'calculator-input',
            moduleId: module.id,
            templateUrl: 'calculator-input.component.html',
            styleUrls: ['calculator-input.component.css'],
            directives: [widget_calculator_input_component_1.WidgetCalculatorInputComponent, widget_calculator_radio_component_1.WidgetCalculatorRadioComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], CalculatorInputComponent);
    return CalculatorInputComponent;
}());
exports.CalculatorInputComponent = CalculatorInputComponent;
//# sourceMappingURL=calculator-input.component.js.map