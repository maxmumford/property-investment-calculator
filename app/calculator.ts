export class Calculator {

  // input with default values
  constructor(
    private _advanced: boolean = false,
    private propertyName: string = "",

    // tenant
    private tenantNumber: number = 5, 
    private rentPerTenantWeekly: number = 100,
    
    // expenses
    private billsYearly: number = 2000,
    private voids: number = 10,
    private management: number = 10,
    private maintenanceYearly: number = 1000,

    // property
    private purchasePrice: number = 140000,
    private refurbCost: number = 20000,

    // mortgage
    private paymentBasis: string = 'repayment',
    private mortgageType: string = 'buyToLet',
    private valuationBuyToLet: number = 180000,
    private multiplier: number = 7,
    private pullOutExtraMoney: boolean = false,
    private loanToValue: number = 75,
    private apr: number = 6,
    private term: number = 25
    ){
  }

  get advanced():Boolean {
      return this._advanced;
  }
  set advanced(advanced:Boolean) {
      this._advanced = advanced;
      // reset hidden fields to their default values
      if(!advanced){
        this.paymentBasis = 'repayment';
        this.mortgageType = 'buyToLet';
        this.loanToValue = 75;
        this.term = 25;
      }
  }

  // calculations
  revenueYearly(): number{
    if(this.tenantNumber && this.rentPerTenantWeekly)
      return this.tenantNumber * this.rentPerTenantWeekly * 52;
    else 
      return 0;
  }

  voidsCost(){
    return this.revenueYearly() * (this.voids / 100);
  }

  managementCost(){
    return this.revenueYearly() * (this.management / 100);
  }

  expensesYearly(){
    if(this.advanced)
      return +this.billsYearly + +this.voidsCost() + +this.managementCost() + +this.maintenanceYearly;
    else
      return +this.billsYearly + +this.maintenanceYearly;
  }

  capitalInvested(){
    return +this.purchasePrice + +this.refurbCost;
  }

  mortgagePrincipal(){
    let valuation = this.valuation();
    if(this.mortgageType == 'buyToLet'){
      return valuation * (this.loanToValue / 100);
    }
    else if (this.mortgageType == 'commercial'){
      let financeAvailable = valuation * (this.loanToValue / 100);
      let capitalInvested = this.capitalInvested();
      if( financeAvailable > capitalInvested && this.pullOutExtraMoney )
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
    if(this.pullOutExtraMoney){
      let moneyPulledOut = this.mortgagePrincipal() - this.capitalInvested();
      return (moneyPulledOut >= 0) ? moneyPulledOut : 0;
    }
    else
      return 0;
  }

  mortgagePaymentsMonthly(){
    if( this.paymentBasis == 'repayment' )
      return - this.PMT( ((this.apr / 100) / 12), (this.term * 12), this.mortgagePrincipal() );
    else if ( this.paymentBasis == 'interestOnly' )
      return this.mortgagePrincipal() * ((this.apr / 100) / 12);
  }

  mortgagePaymentsYearly(){
    return this.mortgagePaymentsMonthly() * 12;
  }

  valuation(){
    if( this.mortgageType == 'buyToLet' )
      return this.valuationBuyToLet;
    else if( this.mortgageType == 'commercial' )
      return this.revenueYearly() * this.multiplier;
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
