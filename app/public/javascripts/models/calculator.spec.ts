import { UserService } from '../services/user.service';

import { User } from './user';
import { Calculator } from './calculator';
import { Opportunity } from './opportunity';

let userService: UserService = new UserService(null, null);
userService.user = new User("maxmumford@gmail.com", "test", "theuserid123");

describe('Calculator Readonly', () => {

  let opportunity = new Opportunity();
  opportunity.id = "1234567890567";
  opportunity.user = "anotheruserid456";

  let calculator = new Calculator(userService, opportunity);

  it('is readonly', () => {
    expect(calculator.isReadonly()).toEqual(true);
  });

});

describe('Calculator Not Readonly', () => {

  let opportunity = new Opportunity();
  opportunity.id = "0987654327654";
  opportunity.user = "theuserid123";

  let calculator = new Calculator(userService, opportunity);

  it('is readonly', () => {
    expect(calculator.isReadonly()).toEqual(false);
  });

});

describe('Calculator Simple No Mortgage', () => {

  let opportunity;
  let calculator;

  opportunity = new Opportunity();
  opportunity.tenantNumber = 5;
  opportunity.rentPerTenantMonthly = 420;
  opportunity.billsYearly = 2000;
  opportunity.maintenanceYearly = 1000;
  opportunity.purchasePrice = 70000;
  opportunity.refurbCost = 50000;
  opportunity.mortgage = false;

  calculator = new Calculator(userService, opportunity);

  // test default values
  it('has name', () => {
    expect(opportunity.name).toEqual('');
  });

  it('has advanced', () => {
    expect(calculator.advanced).toEqual(false);
  });

  // test calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(22200);
  });
  it('has correct monthly profit', () => { // only have to test this once as it's based on a correct yearly profit
    expect(calculator.profitMonthly()).toEqual(1850);
  });
  it('has correct yearly revenue', () => {
    expect(calculator.revenueYearly()).toEqual(25200);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(22200.00);
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
  opportunity.rentPerTenantMonthly = 420;
  opportunity.billsYearly = 2000;
  opportunity.maintenanceYearly = 1000;
  opportunity.purchasePrice = 70000;
  opportunity.refurbCost = 50000;
  opportunity.mortgage = true;
  opportunity.paymentBasis = 'repayment';
  opportunity.mortgageType = 'buyToLet';
  opportunity.valuationBuyToLet = 180000;
  opportunity.apr = 6;

  let calculator = new Calculator(null, opportunity);

  // test default values
  it('has name', () => {
    expect(opportunity.name).toEqual('');
  });

  it('has advanced', () => {
    expect(calculator.advanced).toEqual(false);
  });

  // test calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(11762.317295934623);
  });
  it('has correct yearly revenue', () => {
    expect(calculator.revenueYearly()).toEqual(25200);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(22200);
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
  opportunity.rentPerTenantMonthly = 420;
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

  let calculator = new Calculator(null, opportunity);

  // test advanced calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(6722.317295934623);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(17160);
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

  // test formulas
  it('has correct yield', () => {
    expect(calculator.yield()).toEqual(14.000000000000002);
  });
  it('has correct roi', () => {
    expect(calculator.returnOnInvestment()).toEqual(22.04038457683483);
  });

});

describe('Calculator Advanced BuyToLet Interest Only', () => {

  // setup advanced test
  let opportunity = new Opportunity();
  opportunity.tenantNumber = 5;
  opportunity.rentPerTenantMonthly = 420;
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

  let calculator = new Calculator(null, opportunity);

  // test advanced calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(9060);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(17160);
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
  opportunity.rentPerTenantMonthly = 420;
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

  let calculator = new Calculator(null, opportunity);

  // test advanced calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(6931.070950015932);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(17160);
  });
  it('has correct mortgage principal', () => {
    expect(calculator.mortgagePrincipal()).toEqual(132300);
  });
  it('has correct yearly mortgage payments', () => {
    expect(calculator.mortgagePaymentsYearly()).toEqual(10228.929049984068);
  });
  it('has correct capital invested', () => {
    expect(calculator.capitalInvested()).toEqual(165500);
  });
  it('has correct money left in', () => {
    expect(calculator.moneyLeftIn()).toEqual(33200);
  });

});

describe('Calculator Advanced Commercial Interest Only', () => {

  // setup advanced test
  let opportunity = new Opportunity();
  opportunity.tenantNumber = 5;
  opportunity.rentPerTenantMonthly = 420;
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

  let calculator = new Calculator(null, opportunity);

  // test advanced calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(9222);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(17160);
  });
  it('has correct mortgage principal', () => {
    expect(calculator.mortgagePrincipal()).toEqual(132300);
  });
  it('has correct yearly mortgage payments', () => {
    expect(calculator.mortgagePaymentsYearly()).toEqual(7938);
  });
  it('has correct capital invested', () => {
    expect(calculator.capitalInvested()).toEqual(165500);
  });
  it('has correct money left in', () => {
    expect(calculator.moneyLeftIn()).toEqual(33200);
  });

});

describe('Calculator Advanced Commercial Interest Only Pull Money Out', () => {

  // setup advanced test
  let opportunity = new Opportunity();
  opportunity.tenantNumber = 5;
  opportunity.rentPerTenantMonthly = 420;
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

  let calculator = new Calculator(null, opportunity);

  // test advanced calculations
  it('has correct yearly profit', () => {
    expect(calculator.profitYearly()).toEqual(6954);
  });
  it('has correct yearly gross profit', () => {
    expect(calculator.grossProfitYearly()).toEqual(17160);
  });
  it('has correct mortgage principal', () => {
    expect(calculator.mortgagePrincipal()).toEqual(170100);
  });
  it('has correct yearly mortgage payments', () => {
    expect(calculator.mortgagePaymentsYearly()).toEqual(10206);
  });
  it('has correct capital invested', () => {
    expect(calculator.capitalInvested()).toEqual(165500);
  });
  it('has correct money left in', () => {
    expect(calculator.moneyLeftIn()).toEqual(0);
  });
  it('has correct money pulled out', () => {
    expect(calculator.moneyPulledOut()).toEqual(4600);
  });

});
