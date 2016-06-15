import { Property } from './property';

export class Calculator {

  // properties
  constructor(private _property: Property = new Property()){
  }

  // getters and setters
  get property():Property {
    return this._property;
  }
  set property(property:Property){
    this._property = property;
  }

  get advanced():boolean {
      return this._property.calculatorAdvanced;
  }
  set advanced(advanced:boolean) {
    this._property.calculatorAdvanced = advanced;
    // reset hidden fields to their default values
    if(!advanced){
      this._property.paymentBasis = 'repayment';
      this._property.mortgageType = 'buyToLet';
      this._property.loanToValue = 75;
      this._property.term = 25;
    }
  }

  // calculations
  revenueYearly(): number{
    if (this._property.tenantNumber && this._property.rentPerTenantWeekly)
      return this._property.tenantNumber * this._property.rentPerTenantWeekly * 52;
    else 
      return 0;
  }

  voidsCost(){
    return this.revenueYearly() * (this._property.voids / 100);
  }

  managementCost(){
    return this.revenueYearly() * (this._property.management / 100);
  }

  expensesYearly(){
    if(this.advanced)
      return +this._property.billsYearly + +this.voidsCost() + +this.managementCost() + +this._property.maintenanceYearly;
    else
      return +this._property.billsYearly + +this._property.maintenanceYearly;
  }

  capitalInvested(){
    if(this.advanced)
      return +this._property.legalFees + +this._property.stampDuty + +this._property.purchasePrice + +this._property.refurbCost;
    else
      return +this._property.purchasePrice + +this._property.refurbCost;
  }

  mortgagePrincipal(){
    let valuation = this.valuation();
    if(this._property.mortgageType == 'buyToLet'){
      return valuation * (this._property.loanToValue / 100);
    }
    else if (this._property.mortgageType == 'commercial'){
      let financeAvailable = valuation * (this._property.loanToValue / 100);
      let capitalInvested = this.capitalInvested();
      if (financeAvailable > capitalInvested && this._property.pullOutExtraMoney)
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

  moneyPulledOut(){
    if (this._property.pullOutExtraMoney) {
      let moneyPulledOut = this.mortgagePrincipal() - this.capitalInvested();
      return (moneyPulledOut >= 0) ? moneyPulledOut : 0;
    }
    else
      return 0;
  }

  mortgagePaymentsMonthly(){
    if( this._property.paymentBasis == 'repayment' ){
      var pmt = - this.PMT(((this._property.apr / 100) / 12), (this._property.term * 12), this.mortgagePrincipal());
      return ( !isNaN(pmt) ) ? pmt : 0;
    }
    else if ( this._property.paymentBasis == 'interestOnly' )
      return this.mortgagePrincipal() * ((this._property.apr / 100) / 12);
  }

  mortgagePaymentsYearly(){
    return this.mortgagePaymentsMonthly() * 12;
  }

  valuation(){
    if( this._property.mortgageType == 'buyToLet' )
      return this._property.valuationBuyToLet;
    else if( this._property.mortgageType == 'commercial' )
      return this.revenueYearly() * this._property.multiplier;
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
