"use strict";
var Calculator = (function () {
    // input with default values
    function Calculator(_advanced, propertyName, 
        // tenant
        tenantNumber, rentPerTenantWeekly, 
        // expenses
        billsYearly, voids, management, maintenanceYearly, 
        // property
        purchasePrice, refurbCost, 
        // mortgage
        paymentBasis, mortgageType, valuationBuyToLet, multiplier, pullOutExtraMoney, loanToValue, apr, term) {
        if (_advanced === void 0) { _advanced = false; }
        if (propertyName === void 0) { propertyName = ""; }
        if (tenantNumber === void 0) { tenantNumber = 5; }
        if (rentPerTenantWeekly === void 0) { rentPerTenantWeekly = 100; }
        if (billsYearly === void 0) { billsYearly = 2000; }
        if (voids === void 0) { voids = 10; }
        if (management === void 0) { management = 10; }
        if (maintenanceYearly === void 0) { maintenanceYearly = 1000; }
        if (purchasePrice === void 0) { purchasePrice = 140000; }
        if (refurbCost === void 0) { refurbCost = 20000; }
        if (paymentBasis === void 0) { paymentBasis = 'repayment'; }
        if (mortgageType === void 0) { mortgageType = 'buyToLet'; }
        if (valuationBuyToLet === void 0) { valuationBuyToLet = 180000; }
        if (multiplier === void 0) { multiplier = 7; }
        if (pullOutExtraMoney === void 0) { pullOutExtraMoney = false; }
        if (loanToValue === void 0) { loanToValue = 75; }
        if (apr === void 0) { apr = 6; }
        if (term === void 0) { term = 25; }
        this._advanced = _advanced;
        this.propertyName = propertyName;
        this.tenantNumber = tenantNumber;
        this.rentPerTenantWeekly = rentPerTenantWeekly;
        this.billsYearly = billsYearly;
        this.voids = voids;
        this.management = management;
        this.maintenanceYearly = maintenanceYearly;
        this.purchasePrice = purchasePrice;
        this.refurbCost = refurbCost;
        this.paymentBasis = paymentBasis;
        this.mortgageType = mortgageType;
        this.valuationBuyToLet = valuationBuyToLet;
        this.multiplier = multiplier;
        this.pullOutExtraMoney = pullOutExtraMoney;
        this.loanToValue = loanToValue;
        this.apr = apr;
        this.term = term;
    }
    Object.defineProperty(Calculator.prototype, "advanced", {
        get: function () {
            return this._advanced;
        },
        set: function (advanced) {
            this._advanced = advanced;
            // reset hidden fields to their default values
            if (!advanced) {
                this.paymentBasis = 'repayment';
                this.mortgageType = 'buyToLet';
                this.loanToValue = 75;
                this.term = 25;
            }
        },
        enumerable: true,
        configurable: true
    });
    // calculations
    Calculator.prototype.revenueYearly = function () {
        if (this.tenantNumber && this.rentPerTenantWeekly)
            return this.tenantNumber * this.rentPerTenantWeekly * 52;
        else
            return 0;
    };
    Calculator.prototype.voidsCost = function () {
        return this.revenueYearly() * (this.voids / 100);
    };
    Calculator.prototype.managementCost = function () {
        return this.revenueYearly() * (this.management / 100);
    };
    Calculator.prototype.expensesYearly = function () {
        if (this.advanced)
            return +this.billsYearly + +this.voidsCost() + +this.managementCost() + +this.maintenanceYearly;
        else
            return +this.billsYearly + +this.maintenanceYearly;
    };
    Calculator.prototype.capitalInvested = function () {
        return +this.purchasePrice + +this.refurbCost;
    };
    Calculator.prototype.mortgagePrincipal = function () {
        var valuation = this.valuation();
        if (this.mortgageType == 'buyToLet') {
            return valuation * (this.loanToValue / 100);
        }
        else if (this.mortgageType == 'commercial') {
            var financeAvailable = valuation * (this.loanToValue / 100);
            var capitalInvested = this.capitalInvested();
            if (financeAvailable > capitalInvested && this.pullOutExtraMoney)
                return financeAvailable;
            else if (financeAvailable < capitalInvested)
                return financeAvailable;
            else
                return capitalInvested;
        }
    };
    Calculator.prototype.moneyLeftIn = function () {
        var moneyLeftIn = this.capitalInvested() - this.mortgagePrincipal();
        return (moneyLeftIn >= 0) ? moneyLeftIn : 0;
    };
    Calculator.prototype.moneyPulledOut = function () {
        if (this.pullOutExtraMoney) {
            var moneyPulledOut = this.mortgagePrincipal() - this.capitalInvested();
            return (moneyPulledOut >= 0) ? moneyPulledOut : 0;
        }
        else
            return 0;
    };
    Calculator.prototype.mortgagePaymentsMonthly = function () {
        if (this.paymentBasis == 'repayment')
            return -this.PMT(((this.apr / 100) / 12), (this.term * 12), this.mortgagePrincipal());
        else if (this.paymentBasis == 'interestOnly')
            return this.mortgagePrincipal() * ((this.apr / 100) / 12);
    };
    Calculator.prototype.mortgagePaymentsYearly = function () {
        return this.mortgagePaymentsMonthly() * 12;
    };
    Calculator.prototype.valuation = function () {
        if (this.mortgageType == 'buyToLet')
            return this.valuationBuyToLet;
        else if (this.mortgageType == 'commercial')
            return this.revenueYearly() * this.multiplier;
    };
    Calculator.prototype.valueUplift = function () {
        return this.valuation() - this.capitalInvested();
    };
    Calculator.prototype.grossProfitYearly = function () {
        return this.revenueYearly() - this.expensesYearly();
    };
    Calculator.prototype.profitYearly = function () {
        return this.grossProfitYearly() - this.mortgagePaymentsYearly();
    };
    Calculator.prototype.profitMonthly = function () {
        return this.profitYearly() / 12;
    };
    Calculator.prototype.PMT = function (ir, np, pv, fv, type) {
        if (fv === void 0) { fv = 0; }
        if (type === void 0) { type = 0; }
        /*
         * ir   - interest rate per month
         * np   - number of periods (months)
         * pv   - present value
         * fv   - future value
         * type - when the payments are due:
         *        0: end of the period, e.g. end of month (default)
         *        1: beginning of period
         */
        var pmt, pvif;
        if (ir === 0)
            return -(pv + fv) / np;
        pvif = Math.pow(1 + ir, np);
        pmt = -ir * pv * (pvif + fv) / (pvif - 1);
        if (type === 1)
            pmt /= (1 + ir);
        return pmt;
    };
    return Calculator;
}());
exports.Calculator = Calculator;
//# sourceMappingURL=calculator.js.map