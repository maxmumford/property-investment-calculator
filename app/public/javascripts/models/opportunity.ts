export class Opportunity {

  private _id: string = null;
  public name: string = "";
  public calculatorAdvanced: boolean = false;

  // tenant
  public tenantNumber: number = 0; 
  public rentPerTenantWeekly: number = 0;
  
  // expenses
  public billsYearly: number = 0;
  public voids: number = 0;
  public management: number = 0;
  public maintenanceYearly: number = 0;

  // property
  public purchasePrice: number = 0;
  public refurbCost: number = 0;
  public legalFees: number = 0;
  public stampDuty: number = 0;

  // mortgage
  public mortgage: boolean = false;
  public paymentBasis: string = 'repayment';
  public mortgageType: string = 'buyToLet';
  public valuationBuyToLet: number = 0;
  public multiplier: number = 7;
  public pullOutExtraMoney: boolean = false;
  public loanToValue: number = 75;
  public apr: number = 3.5;
  public term: number = 25;

  get id(): string {
    return this._id;
  }
  set id(id){
    this._id = id;
  }

  // returns true if this object doesnt have an ID, ie hasnt been saved yet
  isNewDocument(){
    return (this._id === null);
  }

}

module.exports = { Opportunity: Opportunity };
