import { Calculator } from './calculator';
import { Opportunity } from './opportunity';

describe('Calculator Simple No Mortgage', () => {

  let opportunity = new Opportunity();
  opportunity.tenantNumber = 5;
  opportunity.rentPerTenantWeekly = 100;
  opportunity.billsYearly = 2000;
  opportunity.maintenanceYearly = 1000;
  opportunity.purchasePrice = 70000;
  opportunity.refurbCost = 50000;
  opportunity.mortgage = false;

  let calculator = new Calculator(opportunity);

  // test default values
  it('has name', () => {
    expect(opportunity.name).toEqual('');
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

  let opportunity = new Opportunity();
  opportunity.tenantNumber = 5;
  opportunity.rentPerTenantWeekly = 100;
  opportunity.billsYearly = 2000;
  opportunity.maintenanceYearly = 1000;
  opportunity.purchasePrice = 70000;
  opportunity.refurbCost = 50000;
  opportunity.mortgage = true;
  opportunity.paymentBasis = 'repayment';
  opportunity.mortgageType = 'buyToLet';
  opportunity.valuationBuyToLet = 180000;
  opportunity.apr = 6;

  let calculator = new Calculator(opportunity);

  // test default values
  it('has name', () => {
    expect(opportunity.name).toEqual('');
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
  let opportunity = new Opportunity();
  opportunity.tenantNumber = 5;
  opportunity.rentPerTenantWeekly = 100;
  opportunity.billsYearly = 2000;
  opportunity.maintenanceYearly = 1000;
  opportunity.management = 10;
  opportunity.voids = 10;
  opportunity.purchasePrice = 140000;
  opportunity.refurbCost = 20000;
  opportunity.legalFees = 1000;
  opportunity.stampDuty = 4500;
  opportunity.mortgage = true;
  opportunity.paymentBasis = 'repayment';
  opportunity.mortgageType = 'buyToLet';
  opportunity.valuationBuyToLet = 180000;
  opportunity.pullOutExtraMoney = false;
  opportunity.loanToValue = 75;
  opportunity.apr = 6;
  opportunity.term = 25;
  opportunity.calculatorAdvanced = true;

  let calculator = new Calculator(opportunity);

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
  let opportunity = new Opportunity();
  opportunity.tenantNumber = 5;
  opportunity.rentPerTenantWeekly = 100;
  opportunity.billsYearly = 2000;
  opportunity.maintenanceYearly = 1000;
  opportunity.management = 10;
  opportunity.voids = 10;
  opportunity.purchasePrice = 140000;
  opportunity.refurbCost = 20000;
  opportunity.legalFees = 1000;
  opportunity.stampDuty = 4500;
  opportunity.mortgage = true;
  opportunity.paymentBasis = 'interestOnly';
  opportunity.mortgageType = 'buyToLet';
  opportunity.valuationBuyToLet = 180000;
  opportunity.pullOutExtraMoney = false;
  opportunity.multiplier = 7;
  opportunity.loanToValue = 75;
  opportunity.apr = 6;
  opportunity.term = 25;
  opportunity.calculatorAdvanced = true;

  let calculator = new Calculator(opportunity);

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
  let opportunity = new Opportunity();
  opportunity.tenantNumber = 5;
  opportunity.rentPerTenantWeekly = 100;
  opportunity.billsYearly = 2000;
  opportunity.maintenanceYearly = 1000;
  opportunity.management = 10;
  opportunity.voids = 10;
  opportunity.purchasePrice = 140000;
  opportunity.refurbCost = 20000;
  opportunity.legalFees = 1000;
  opportunity.stampDuty = 4500;
  opportunity.mortgage = true;
  opportunity.paymentBasis = 'repayment';
  opportunity.mortgageType = 'commercial';
  opportunity.pullOutExtraMoney = false;
  opportunity.multiplier = 7;
  opportunity.loanToValue = 75;
  opportunity.apr = 6;
  opportunity.term = 25;
  opportunity.calculatorAdvanced = true;

  let calculator = new Calculator(opportunity);

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
  let opportunity = new Opportunity();
  opportunity.tenantNumber = 5;
  opportunity.rentPerTenantWeekly = 100;
  opportunity.billsYearly = 2000;
  opportunity.maintenanceYearly = 1000;
  opportunity.management = 10;
  opportunity.voids = 10;
  opportunity.purchasePrice = 140000;
  opportunity.refurbCost = 20000;
  opportunity.legalFees = 1000;
  opportunity.stampDuty = 4500;
  opportunity.mortgage = true;
  opportunity.paymentBasis = 'interestOnly';
  opportunity.mortgageType = 'commercial';
  opportunity.valuationBuyToLet = 180000;
  opportunity.pullOutExtraMoney = false;
  opportunity.multiplier = 7;
  opportunity.loanToValue = 75;
  opportunity.apr = 6;
  opportunity.term = 25;
  opportunity.calculatorAdvanced = true;

  let calculator = new Calculator(opportunity);

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
  let opportunity = new Opportunity();
  opportunity.tenantNumber = 5;
  opportunity.rentPerTenantWeekly = 100;
  opportunity.billsYearly = 2000;
  opportunity.maintenanceYearly = 1000;
  opportunity.management = 10;
  opportunity.voids = 10;
  opportunity.purchasePrice = 140000;
  opportunity.refurbCost = 20000;
  opportunity.legalFees = 1000;
  opportunity.stampDuty = 4500;
  opportunity.mortgage = true;
  opportunity.paymentBasis = 'interestOnly';
  opportunity.mortgageType = 'commercial';
  opportunity.valuationBuyToLet = 180000;
  opportunity.pullOutExtraMoney = true;
  opportunity.multiplier = 9;
  opportunity.loanToValue = 75;
  opportunity.apr = 6;
  opportunity.term = 25;
  opportunity.calculatorAdvanced = true;

  let calculator = new Calculator(opportunity);

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
