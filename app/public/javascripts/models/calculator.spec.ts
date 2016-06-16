import { Calculator } from './calculator';
import { Property } from './property';

describe('Calculator Simple No Mortgage', () => {

  let property = new Property();
  property.tenantNumber = 5;
  property.rentPerTenantWeekly = 100;
  property.billsYearly = 2000;
  property.maintenanceYearly = 1000;
  property.purchasePrice = 70000;
  property.refurbCost = 50000;
  property.mortgage = false;

  let calculator = new Calculator(property);

  // test default values
  it('has property name', () => {
    expect(property.name).toEqual('');
  });

  it('has advanced', () => {
    expect(calculator.advanced).toEqual(false);
  });

  // test calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(23000);
  });
  it('has correct monthly profit', () => {
    expect(calculator.profitMonthly()).toEqual(1916.6666666666667);
  });
  it('has correct yearly revenue', () => {
    expect(calculator.revenueYearly()).toEqual(26000.00);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(23000.00);
  });
  it('has correct mortgage principal', () => {
    expect(calculator.mortgagePrincipal()).toEqual(0);
  });
  it('has correct yearly mortgage payments', () => {
    expect(calculator.mortgagePaymentsYearly()).toEqual(0);
  });
  it('has correct capital invested', () => {
    expect(calculator.capitalInvested()).toEqual(120000);
  });
  it('has correct money left in', () => {
    expect(calculator.moneyLeftIn()).toEqual(120000);
  });

});

describe('Calculator Simple BuyToLet Repayment', () => {

  let property = new Property();
  property.tenantNumber = 5;
  property.rentPerTenantWeekly = 100;
  property.billsYearly = 2000;
  property.maintenanceYearly = 1000;
  property.purchasePrice = 70000;
  property.refurbCost = 50000;
  property.mortgage = true;
  property.paymentBasis = 'repayment';
  property.mortgageType = 'buyToLet';
  property.valuationBuyToLet = 180000;
  property.apr = 6;

  let calculator = new Calculator(property);

  // test default values
  it('has property name', () => {
    expect(property.name).toEqual('');
  });

  it('has advanced', () => {
    expect(calculator.advanced).toEqual(false);
  });

  // test calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(12562.317295934623);
  });
  it('has correct monthly profit', () => {
    expect(calculator.profitMonthly()).toEqual(1046.8597746612186);
  });
  it('has correct yearly revenue', () => {
    expect(calculator.revenueYearly()).toEqual(26000.00);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(23000.00);
  });
  it('has correct mortgage principal', () => {
    expect(calculator.mortgagePrincipal()).toEqual(135000);
  });
  it('has correct yearly mortgage payments', () => {
    expect(calculator.mortgagePaymentsYearly()).toEqual(10437.682704065377);
  });
  it('has correct capital invested', () => {
    expect(calculator.capitalInvested()).toEqual(120000);
  });
  it('has correct money left in', () => {
    expect(calculator.moneyLeftIn()).toEqual(0);
  });

});

describe('Calculator Advanced BuyToLet Repayment', () => {

  // setup advanced test
  let property = new Property();
  property.tenantNumber = 5;
  property.rentPerTenantWeekly = 100;
  property.billsYearly = 2000;
  property.maintenanceYearly = 1000;
  property.management = 10;
  property.voids = 10;
  property.purchasePrice = 140000;
  property.refurbCost = 20000;
  property.legalFees = 1000;
  property.stampDuty = 4500;
  property.mortgage = true;
  property.paymentBasis = 'repayment';
  property.mortgageType = 'buyToLet';
  property.valuationBuyToLet = 180000;
  property.pullOutExtraMoney = false;
  property.loanToValue = 75;
  property.apr = 6;
  property.term = 25;
  property.calculatorAdvanced = true;

  let calculator = new Calculator(property);

  // test advanced calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(7362.317295934623);
  });
  it('has correct monthly profit', () => {
    expect(calculator.profitMonthly()).toEqual(613.5264413278852);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(17800);
  });
  it('has correct mortgage principal', () => {
    expect(calculator.mortgagePrincipal()).toEqual(135000);
  });
  it('has correct yearly mortgage payments', () => {
    expect(calculator.mortgagePaymentsYearly()).toEqual(10437.682704065377);
  });
  it('has correct capital invested', () => {
    expect(calculator.capitalInvested()).toEqual(165500);
  });
  it('has correct money left in', () => {
    expect(calculator.moneyLeftIn()).toEqual(30500);
  });

});

describe('Calculator Advanced BuyToLet Interest Only', () => {

  // setup advanced test
  let property = new Property();
  property.tenantNumber = 5;
  property.rentPerTenantWeekly = 100;
  property.billsYearly = 2000;
  property.maintenanceYearly = 1000;
  property.management = 10;
  property.voids = 10;
  property.purchasePrice = 140000;
  property.refurbCost = 20000;
  property.legalFees = 1000;
  property.stampDuty = 4500;
  property.mortgage = true;
  property.paymentBasis = 'interestOnly';
  property.mortgageType = 'buyToLet';
  property.valuationBuyToLet = 180000;
  property.pullOutExtraMoney = false;
  property.multiplier = 7;
  property.loanToValue = 75;
  property.apr = 6;
  property.term = 25;
  property.calculatorAdvanced = true;
  
  let calculator = new Calculator(property);

  // test advanced calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(9700);
  });
  it('has correct monthly profit', () => {
    expect(calculator.profitMonthly()).toEqual(808.3333333333334);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(17800);
  });
  it('has correct mortgage principal', () => {
    expect(calculator.mortgagePrincipal()).toEqual(135000);
  });
  it('has correct yearly mortgage payments', () => {
    expect(calculator.mortgagePaymentsYearly()).toEqual(8100);
  });
  it('has correct capital invested', () => {
    expect(calculator.capitalInvested()).toEqual(165500);
  });
  it('has correct money left in', () => {
    expect(calculator.moneyLeftIn()).toEqual(30500);
  });

});

describe('Calculator Advanced Commercial Repayment', () => {

  // setup advanced test
  let property = new Property();
  property.tenantNumber = 5;
  property.rentPerTenantWeekly = 100;
  property.billsYearly = 2000;
  property.maintenanceYearly = 1000;
  property.management = 10;
  property.voids = 10;
  property.purchasePrice = 140000;
  property.refurbCost = 20000;
  property.legalFees = 1000;
  property.stampDuty = 4500;
  property.mortgage = true;
  property.paymentBasis = 'repayment';
  property.mortgageType = 'commercial';
  property.pullOutExtraMoney = false;
  property.multiplier = 7;
  property.loanToValue = 75;
  property.apr = 6;
  property.term = 25;
  property.calculatorAdvanced = true;
  
  let calculator = new Calculator(property);

  // test advanced calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(7246.3430436672315);
  });
  it('has correct monthly profit', () => {
    expect(calculator.profitMonthly()).toEqual(603.8619203056027);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(17800);
  });
  it('has correct mortgage principal', () => {
    expect(calculator.mortgagePrincipal()).toEqual(136500);
  });
  it('has correct yearly mortgage payments', () => {
    expect(calculator.mortgagePaymentsYearly()).toEqual(10553.656956332768);
  });
  it('has correct capital invested', () => {
    expect(calculator.capitalInvested()).toEqual(165500);
  });
  it('has correct money left in', () => {
    expect(calculator.moneyLeftIn()).toEqual(29000);
  });

});

describe('Calculator Advanced Commercial Interest Only', () => {

  // setup advanced test
  let property = new Property();
  property.tenantNumber = 5;
  property.rentPerTenantWeekly = 100;
  property.billsYearly = 2000;
  property.maintenanceYearly = 1000;
  property.management = 10;
  property.voids = 10;
  property.purchasePrice = 140000;
  property.refurbCost = 20000;
  property.legalFees = 1000;
  property.stampDuty = 4500;
  property.mortgage = true;
  property.paymentBasis = 'interestOnly';
  property.mortgageType = 'commercial';
  property.valuationBuyToLet = 180000;
  property.pullOutExtraMoney = false;
  property.multiplier = 7;
  property.loanToValue = 75;
  property.apr = 6;
  property.term = 25;
  property.calculatorAdvanced = true;
  
  let calculator = new Calculator(property);

  // test advanced calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(9610);
  });
  it('has correct monthly profit', () => {
    expect(calculator.profitMonthly()).toEqual(800.8333333333334);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(17800);
  });
  it('has correct mortgage principal', () => {
    expect(calculator.mortgagePrincipal()).toEqual(136500);
  });
  it('has correct yearly mortgage payments', () => {
    expect(calculator.mortgagePaymentsYearly()).toEqual(8190);
  });
  it('has correct capital invested', () => {
    expect(calculator.capitalInvested()).toEqual(165500);
  });
  it('has correct money left in', () => {
    expect(calculator.moneyLeftIn()).toEqual(29000);
  });

});

describe('Calculator Advanced Commercial Interest Only Pull Money Out', () => {

  // setup advanced test
  let property = new Property();
  property.tenantNumber = 5;
  property.rentPerTenantWeekly = 100;
  property.billsYearly = 2000;
  property.maintenanceYearly = 1000;
  property.management = 10;
  property.voids = 10;
  property.purchasePrice = 140000;
  property.refurbCost = 20000;
  property.legalFees = 1000;
  property.stampDuty = 4500;
  property.mortgage = true;
  property.paymentBasis = 'interestOnly';
  property.mortgageType = 'commercial';
  property.valuationBuyToLet = 180000;
  property.pullOutExtraMoney = true;
  property.multiplier = 9;
  property.loanToValue = 75;
  property.apr = 6;
  property.term = 25;
  property.calculatorAdvanced = true;
  
  let calculator = new Calculator(property);

  // test advanced calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(7270);
  });
  it('has correct monthly profit', () => {
    expect(calculator.profitMonthly()).toEqual(605.8333333333334);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(17800);
  });
  it('has correct mortgage principal', () => {
    expect(calculator.mortgagePrincipal()).toEqual(175500);
  });
  it('has correct yearly mortgage payments', () => {
    expect(calculator.mortgagePaymentsYearly()).toEqual(10530);
  });
  it('has correct capital invested', () => {
    expect(calculator.capitalInvested()).toEqual(165500);
  });
  it('has correct money left in', () => {
    expect(calculator.moneyLeftIn()).toEqual(0);
  });
  it('has correct money pulled out', () => {
    expect(calculator.moneyPulledOut()).toEqual(10000);
  });

});
