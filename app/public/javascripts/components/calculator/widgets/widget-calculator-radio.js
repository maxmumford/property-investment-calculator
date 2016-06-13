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
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var common_1 = require('@angular/common');
var ng2_bootstrap_2 = require('ng2-bootstrap/ng2-bootstrap');
var WidgetCalculatorRadioComponent = (function () {
    function WidgetCalculatorRadioComponent() {
        this.modelChange = new core_1.EventEmitter();
    }
    WidgetCalculatorRadioComponent.prototype.updateData = function (event) {
        this.model = event;
        this.modelChange.emit(event);
    };
    WidgetCalculatorRadioComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WidgetCalculatorRadioComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], WidgetCalculatorRadioComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WidgetCalculatorRadioComponent.prototype, "tooltip", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WidgetCalculatorRadioComponent.prototype, "model", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WidgetCalculatorRadioComponent.prototype, "modelChange", void 0);
    WidgetCalculatorRadioComponent = __decorate([
        core_1.Component({
            selector: 'widget-calculator-radio',
            templateUrl: 'app/widgets/widget-calculator-radio.component.html',
            directives: [ng2_bootstrap_1.TOOLTIP_DIRECTIVES, ng2_bootstrap_2.BUTTON_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], WidgetCalculatorRadioComponent);
    return WidgetCalculatorRadioComponent;
}());
exports.WidgetCalculatorRadioComponent = WidgetCalculatorRadioComponent;
//# sourceMappingURL=widget-calculator-radio.js.map