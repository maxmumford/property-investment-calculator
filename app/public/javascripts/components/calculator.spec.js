"use strict";
var calculator_1 = require('./calculator');
describe('Calculator Simple', function () {
    var calculator = new calculator_1.Calculator();
    // setup simple calculation tests
    calculator.tenantNumber = 5;
    calculator.rentPerTenantWeekly = 100;
    calculator.billsYearly = 2000;
    calculator.maintenanceYearly = 1000;
    calculator.purchasePrice = 70000;
    calculator.refurbCost = 50000;
    calculator.paymentBasis = 'repayment';
    calculator.mortgageType = 'buyToLet';
    calculator.valuationBuyToLet = 180000;
    calculator.apr = 6;
    // test default values
    it('has property name', function () {
        expect(calculator.propertyName).toEqual('');
    });
    it('has advanced', function () {
        expect(calculator.advanced).toEqual(false);
    });
    // test simple calculations
    it('has correct yearly profit', function () {
        expect(calculator.profitYearly()).toEqual(12562.317295934623);
    });
    it('has correct monthly profit', function () {
        expect(calculator.profitMonthly()).toEqual(1046.8597746612186);
    });
    it('has correct yearly revenue', function () {
        expect(calculator.revenueYearly()).toEqual(26000.00);
    });
    it('has correct yearly gross profit', function () {
        expect(calculator.grossProfitYearly()).toEqual(23000.00);
    });
    it('has correct mortgage principal', function () {
        expect(calculator.mortgagePrincipal()).toEqual(135000);
    });
    it('has correct yearly mortgage payments', function () {
        expect(calculator.mortgagePaymentsYearly()).toEqual(10437.682704065377);
    });
    it('has correct capital invested', function () {
        expect(calculator.capitalInvested()).toEqual(120000);
    });
    it('has correct money left in', function () {
        expect(calculator.moneyLeftIn()).toEqual(0);
    });
});
describe('Calculator Advanced BuyToLet Repayment', function () {
    // setup advanced test
    var calculator = new calculator_1.Calculator();
    calculator.advanced = true;
    calculator.tenantNumber = 5;
    calculator.rentPerTenantWeekly = 100;
    calculator.billsYearly = 2000;
    calculator.maintenanceYearly = 1000;
    calculator.management = 10;
    calculator.voids = 10;
    calculator.purchasePrice = 140000;
    calculator.refurbCost = 20000;
    calculator.paymentBasis = 'repayment';
    calculator.mortgageType = 'buyToLet';
    calculator.valuationBuyToLet = 180000;
    calculator.pullOutExtraMoney = false;
    calculator.multiplier = 7;
    calculator.loanToValue = 75;
    calculator.apr = 6;
    calculator.term = 25;
    // test advanced calculations
    it('has correct yearly profit', function () {
        expect(calculator.profitYearly()).toEqual(7362.317295934623);
    });
    it('has correct monthly profit', function () {
        expect(calculator.profitMonthly()).toEqual(613.5264413278852);
    });
    it('has correct yearly gross profit', function () {
        expect(calculator.grossProfitYearly()).toEqual(17800);
    });
    it('has correct mortgage principal', function () {
        expect(calculator.mortgagePrincipal()).toEqual(135000);
    });
    it('has correct yearly mortgage payments', function () {
        expect(calculator.mortgagePaymentsYearly()).toEqual(10437.682704065377);
    });
    it('has correct capital invested', function () {
        expect(calculator.capitalInvested()).toEqual(160000);
    });
    it('has correct money left in', function () {
        expect(calculator.moneyLeftIn()).toEqual(25000);
    });
});
describe('Calculator Advanced BuyToLet Interest Only', function () {
    // setup advanced test
    var calculator = new calculator_1.Calculator();
    calculator.advanced = true;
    calculator.tenantNumber = 5;
    calculator.rentPerTenantWeekly = 100;
    calculator.billsYearly = 2000;
    calculator.maintenanceYearly = 1000;
    calculator.management = 10;
    calculator.voids = 10;
    calculator.purchasePrice = 140000;
    calculator.refurbCost = 20000;
    calculator.paymentBasis = 'interestOnly';
    calculator.mortgageType = 'buyToLet';
    calculator.valuationBuyToLet = 180000;
    calculator.pullOutExtraMoney = false;
    calculator.multiplier = 7;
    calculator.loanToValue = 75;
    calculator.apr = 6;
    calculator.term = 25;
    // test advanced calculations
    it('has correct yearly profit', function () {
        expect(calculator.profitYearly()).toEqual(9700);
    });
    it('has correct monthly profit', function () {
        expect(calculator.profitMonthly()).toEqual(808.3333333333334);
    });
    it('has correct yearly gross profit', function () {
        expect(calculator.grossProfitYearly()).toEqual(17800);
    });
    it('has correct mortgage principal', function () {
        expect(calculator.mortgagePrincipal()).toEqual(135000);
    });
    it('has correct yearly mortgage payments', function () {
        expect(calculator.mortgagePaymentsYearly()).toEqual(8100);
    });
    it('has correct capital invested', function () {
        expect(calculator.capitalInvested()).toEqual(160000);
    });
    it('has correct money left in', function () {
        expect(calculator.moneyLeftIn()).toEqual(25000);
    });
});
describe('Calculator Advanced Commercial Repayment', function () {
    // setup advanced test
    var calculator = new calculator_1.Calculator();
    calculator.advanced = true;
    calculator.tenantNumber = 5;
    calculator.rentPerTenantWeekly = 100;
    calculator.billsYearly = 2000;
    calculator.maintenanceYearly = 1000;
    calculator.management = 10;
    calculator.voids = 10;
    calculator.purchasePrice = 140000;
    calculator.refurbCost = 20000;
    calculator.paymentBasis = 'repayment';
    calculator.mortgageType = 'commercial';
    calculator.valuationBuyToLet = 180000;
    calculator.pullOutExtraMoney = false;
    calculator.multiplier = 7;
    calculator.loanToValue = 75;
    calculator.apr = 6;
    calculator.term = 25;
    // test advanced calculations
    it('has correct yearly profit', function () {
        expect(calculator.profitYearly()).toEqual(7246.3430436672315);
    });
    it('has correct monthly profit', function () {
        expect(calculator.profitMonthly()).toEqual(603.8619203056027);
    });
    it('has correct yearly gross profit', function () {
        expect(calculator.grossProfitYearly()).toEqual(17800);
    });
    it('has correct mortgage principal', function () {
        expect(calculator.mortgagePrincipal()).toEqual(136500);
    });
    it('has correct yearly mortgage payments', function () {
        expect(calculator.mortgagePaymentsYearly()).toEqual(10553.656956332768);
    });
    it('has correct capital invested', function () {
        expect(calculator.capitalInvested()).toEqual(160000);
    });
    it('has correct money left in', function () {
        expect(calculator.moneyLeftIn()).toEqual(23500);
    });
});
describe('Calculator Advanced Commercial Interest Only', function () {
    // setup advanced test
    var calculator = new calculator_1.Calculator();
    calculator.advanced = true;
    calculator.tenantNumber = 5;
    calculator.rentPerTenantWeekly = 100;
    calculator.billsYearly = 2000;
    calculator.maintenanceYearly = 1000;
    calculator.management = 10;
    calculator.voids = 10;
    calculator.purchasePrice = 140000;
    calculator.refurbCost = 20000;
    calculator.paymentBasis = 'interestOnly';
    calculator.mortgageType = 'commercial';
    calculator.valuationBuyToLet = 180000;
    calculator.pullOutExtraMoney = false;
    calculator.multiplier = 7;
    calculator.loanToValue = 75;
    calculator.apr = 6;
    calculator.term = 25;
    // test advanced calculations
    it('has correct yearly profit', function () {
        expect(calculator.profitYearly()).toEqual(9610);
    });
    it('has correct monthly profit', function () {
        expect(calculator.profitMonthly()).toEqual(800.8333333333334);
    });
    it('has correct yearly gross profit', function () {
        expect(calculator.grossProfitYearly()).toEqual(17800);
    });
    it('has correct mortgage principal', function () {
        expect(calculator.mortgagePrincipal()).toEqual(136500);
    });
    it('has correct yearly mortgage payments', function () {
        expect(calculator.mortgagePaymentsYearly()).toEqual(8190);
    });
    it('has correct capital invested', function () {
        expect(calculator.capitalInvested()).toEqual(160000);
    });
    it('has correct money left in', function () {
        expect(calculator.moneyLeftIn()).toEqual(23500);
    });
});
describe('Calculator Advanced Commercial Interst Only Pull Money Out', function () {
    // setup advanced test
    var calculator = new calculator_1.Calculator();
    calculator.advanced = true;
    calculator.tenantNumber = 5;
    calculator.rentPerTenantWeekly = 100;
    calculator.billsYearly = 2000;
    calculator.maintenanceYearly = 1000;
    calculator.management = 10;
    calculator.voids = 10;
    calculator.purchasePrice = 140000;
    calculator.refurbCost = 20000;
    calculator.paymentBasis = 'interestOnly';
    calculator.mortgageType = 'commercial';
    calculator.valuationBuyToLet = 180000;
    calculator.pullOutExtraMoney = true;
    calculator.multiplier = 9;
    calculator.loanToValue = 75;
    calculator.apr = 6;
    calculator.term = 25;
    // test advanced calculations
    it('has correct yearly profit', function () {
        expect(calculator.profitYearly()).toEqual(7270);
    });
    it('has correct monthly profit', function () {
        expect(calculator.profitMonthly()).toEqual(605.8333333333334);
    });
    it('has correct yearly gross profit', function () {
        expect(calculator.grossProfitYearly()).toEqual(17800);
    });
    it('has correct mortgage principal', function () {
        expect(calculator.mortgagePrincipal()).toEqual(175500);
    });
    it('has correct yearly mortgage payments', function () {
        expect(calculator.mortgagePaymentsYearly()).toEqual(10530);
    });
    it('has correct capital invested', function () {
        expect(calculator.capitalInvested()).toEqual(160000);
    });
    it('has correct money left in', function () {
        expect(calculator.moneyLeftIn()).toEqual(0);
    });
    it('has correct money pulled out', function () {
        expect(calculator.moneyPulledOut()).toEqual(15500);
    });
});
//# sourceMappingURL=calculator.spec.js.map