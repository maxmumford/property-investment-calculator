import { Opportunity } from './opportunity';
import { UserService } from '../services/user.service';

export class Calculator {

  public readonly: boolean = false;

  constructor(
    private userService: UserService,
    private _opportunity: Opportunity = new Opportunity()) {
  }

  // getters and setters
  get opportunity(): Opportunity {
    return this._opportunity;
  }
  set opportunity(opportunity: Opportunity) {
    this._opportunity = opportunity;
  }

  get advanced(): boolean {
    return this._opportunity.calculatorAdvanced;
  }
  set advanced(advanced: boolean) {
    this._opportunity.calculatorAdvanced = advanced;
    // reset hidden fields to their default values
    if (!advanced) {
      this._opportunity.paymentBasis = 'repayment';
      this._opportunity.mortgageType = 'buyToLet';
      this._opportunity.loanToValue = 75;
      this._opportunity.term = 25;
    }
  }

  isReadonly(){
    // not readonly if it's not yet been saved
    if(null === this.opportunity.id)
      return false;

    // not readonly if user is owner
    if(this.userService.isLoggedIn() && this.userService.user.id == this.opportunity.user)
      return false;

    // readonly    
    return true;
  }

  // calculations
  revenueYearly(): number {
    if (this._opportunity.tenantNumber && this._opportunity.rentPerTenantWeekly)
      return this._opportunity.tenantNumber * this._opportunity.rentPerTenantWeekly * 52;
    else 
      return 0;
  }

  voidsCost() {
    return this.revenueYearly() * (this._opportunity.voids / 100);
  }

  managementCost() {
    return this.revenueYearly() * (this._opportunity.management / 100);
  }

  expensesYearly() {
    if (this.advanced)
      return +this._opportunity.billsYearly + +this.voidsCost() + +this.managementCost() + +this._opportunity.maintenanceYearly;
    else
      return +this._opportunity.billsYearly + +this._opportunity.maintenanceYearly;
  }

  capitalInvested() {
    if (this.advanced)
      return +this._opportunity.legalFees + +this._opportunity.stampDuty + +this._opportunity.purchasePrice + +this._opportunity.refurbCost;
    else
      return +this._opportunity.purchasePrice + +this._opportunity.refurbCost;
  }

  mortgage() {
    return this._opportunity.mortgage;
  }

  mortgagePrincipal() {
    if (!this.mortgage())
      return 0;

    let valuation = this.valuation();
    if (this._opportunity.mortgageType == 'buyToLet') {
      return valuation * (this._opportunity.loanToValue / 100);
    }
    else if (this._opportunity.mortgageType == 'commercial') {
      let financeAvailable = valuation * (this._opportunity.loanToValue / 100);
      let capitalInvested = this.capitalInvested();
      if (financeAvailable > capitalInvested && this._opportunity.pullOutExtraMoney)
        return financeAvailable;
      else if( financeAvailable < capitalInvested)
        return financeAvailable;
      else
        return capitalInvested;
    }
  }

  moneyLeftIn(){
    let moneyLeftIn = this.capitalInvested() - this.mortgagePrincipal();
    return (moneyLeftIn >= 0) ? moneyLeftIn : 0;
  }

  moneyPulledOut() {
    if (this._opportunity.pullOutExtraMoney) {
      let moneyPulledOut = this.mortgagePrincipal() - this.capitalInvested();
      return (moneyPulledOut >= 0) ? moneyPulledOut : 0;
    }
    else
      return 0;
  }

  mortgagePaymentsMonthly() {
    if (!this.mortgage())
      return 0;

    if (this._opportunity.paymentBasis == 'repayment') {
      var pmt = - this.PMT(((this._opportunity.apr / 100) / 12), (this._opportunity.term * 12), this.mortgagePrincipal());
      return (!isNaN(pmt)) ? pmt : 0;
    }
    else if (this._opportunity.paymentBasis == 'interestOnly')
      return this.mortgagePrincipal() * ((this._opportunity.apr / 100) / 12);
  }

  mortgagePaymentsYearly() {
    if (!this.mortgage())
      return 0;

    return this.mortgagePaymentsMonthly() * 12;
  }

  valuation() {
    if (this._opportunity.mortgageType == 'buyToLet')
      return this._opportunity.valuationBuyToLet;
    else if (this._opportunity.mortgageType == 'commercial')
      return this.revenueYearly() * this._opportunity.multiplier;
  }

  valueUplift(){
    return this.valuation() - this.capitalInvested();
  }

  grossProfitYearly(){
    return this.revenueYearly() - this.expensesYearly();
  }

  profitYearly(){
    return this.grossProfitYearly() - this.mortgagePaymentsYearly();
  }

  profitMonthly (){
    return this.profitYearly() / 12;
  }

  yield(){
    return this.revenueYearly() / this.valuation() * 100;
  }

  returnOnInvestment(){
    let moneyLeftIn = this.moneyLeftIn();
    if( moneyLeftIn <= 0 )
      return Infinity;
    else {
      return this.profitYearly() / moneyLeftIn * 100;
    }
  }

  private PMT(ir, np, pv, fv = 0, type = 0) {
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
          return -(pv + fv)/np;

      pvif = Math.pow(1 + ir, np);
      pmt = - ir * pv * (pvif + fv) / (pvif - 1);

      if (type === 1)
          pmt /= (1 + ir);

      return pmt;
  }


}

module.exports = { Calculator: Calculator };
