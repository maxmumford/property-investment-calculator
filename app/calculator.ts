export class Calculator {

  // input with default values
  constructor(
    private tenantNumber: number = 5, 
    private rentPerTenantWeekly: number = 100) {
  }

  // calculators
  revenueAnnual(){
    if(this.tenantNumber && this.rentPerTenantWeekly)
      return this.tenantNumber * this.rentPerTenantWeekly * 52;
    else 
      return '';
  }

}
