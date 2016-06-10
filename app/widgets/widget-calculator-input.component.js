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
var angular2localization_1 = require('angular2localization/angular2localization');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ICONS = {
    "text": "A",
    "number": "#",
    "percent": "%",
    "currency": "£",
};
var WidgetCalculatorInputComponent = (function () {
    function WidgetCalculatorInputComponent(locale) {
        this.locale = locale;
        this.modelChange = new core_1.EventEmitter();
    }
    WidgetCalculatorInputComponent.prototype.updateData = function (event) {
        this.model = event;
        this.modelChange.emit(event);
    };
    Object.defineProperty(WidgetCalculatorInputComponent.prototype, "defaultLocale", {
        get: function () {
            return this.locale.getDefaultLocale();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetCalculatorInputComponent.prototype, "currency", {
        get: function () {
            return this.locale.getCurrentCurrency();
        },
        enumerable: true,
        configurable: true
    });
    WidgetCalculatorInputComponent.prototype.ngOnInit = function () {
        // dynamically set inputSymbol
        this.inputSymbol = ICONS[this.type];
        if (this.type == "percent") {
            this.type = "number";
            this.max = 100;
            this.min = 0;
        }
        else if (this.type == "currency") {
            this.type = "number";
            this.inputSymbol = this.currency;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WidgetCalculatorInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WidgetCalculatorInputComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WidgetCalculatorInputComponent.prototype, "tooltip", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WidgetCalculatorInputComponent.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WidgetCalculatorInputComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WidgetCalculatorInputComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WidgetCalculatorInputComponent.prototype, "step", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WidgetCalculatorInputComponent.prototype, "modelChange", void 0);
    WidgetCalculatorInputComponent = __decorate([
        core_1.Component({
            selector: 'widget-calculator-input',
            templateUrl: 'app/widgets/widget-calculator-input.component.html',
            directives: [ng2_bootstrap_1.TOOLTIP_DIRECTIVES],
            pipes: [angular2localization_1.LocaleCurrencyPipe]
        }), 
        __metadata('design:paramtypes', [angular2localization_1.LocaleService])
    ], WidgetCalculatorInputComponent);
    return WidgetCalculatorInputComponent;
}());
exports.WidgetCalculatorInputComponent = WidgetCalculatorInputComponent;
//# sourceMappingURL=widget-calculator-input.component.js.map