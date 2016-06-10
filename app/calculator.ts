export class Calculator {

  // input with default values
  constructor(
    private advanced: string = "";

    // tenant
    private tenantNumber: number = 5, 
    private rentPerTenantWeekly: number = 100,
    
    // expenses
    private billsYearly: number = 2000,
    private voids: number = 10,
    private management: number = 10,
    private maintenanceYearly: number = 1000

    // property
    private purchasePrice: number = 70000,
    private conversionCost: number = 50000,

    // mortgage
    private paymentBasis: string = 'repayment',
    private mortgageType: string = 'buyToLet',
    private valuation: number = 120000,
    private multiplier: number = 7,
    private pullOutExtraMoney: string = "",
    private loanToValue: number = 75,
    private apr: number = 6,
    private term: number = 25,
    ){
  }

  // calculations
  revenueYearly(){
    if(this.tenantNumber && this.rentPerTenantWeekly)
      return this.tenantNumber * this.rentPerTenantWeekly * 52;
    else 
      return '';
  }

  voidsCost(){
    return this.revenueYearly() * (this.voids / 100);
  }

  managementCost(){
    return this.revenueYearly() * (this.management / 100);
  }

  expensesYearly(){
    return +this.billsYearly + +this.voidsCost() + +this.managementCost() + +this.maintenanceYearly;
  }

  capitalInvested(){
    return this.purchasePrice + this.conversionCost;
  }

  mortgagePrincipal(){
    if(this.mortgageType == 'buyToLet'){
      return this.valuation * (this.loanToValue / 100);
    }
    else if (this.mortgageType == 'commercial'){
      return this.revenueYearly() * this.multiplier * (this.loanToValue / 100);
    }
  }

  moneyLeftIn(){
    return this.capitalInvested() - this.mortgagePrincipal();
  }

  moneyPulledOut(){

  }

  mortgagePaymentsMonthly(){
    return - this.PMT( ((this.apr / 100) / 12), (this.term * 12), this.mortgagePrincipal() );
  }

  mortgagePaymentsYearly(){
    return this.mortgagePaymentsMonthly() * 12;
  }

  grossProfitYearly(){
    return this.revenueYearly() - this.expensesYearly();
  }

  profitYearly(){
    return this.grossProfitYearly() - this.mortgagePaymentsYearly();
  }

  private PMT(ir, np, pv, fv, type) {
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

      fv || (fv = 0);
      type || (type = 0);

      if (ir === 0)
          return -(pv + fv)/np;

      pvif = Math.pow(1 + ir, np);
      pmt = - ir * pv * (pvif + fv) / (pvif - 1);

      if (type === 1)
          pmt /= (1 + ir);

      return pmt;
  }


}
