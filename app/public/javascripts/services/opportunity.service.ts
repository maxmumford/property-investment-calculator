import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { Calculator } from '../models/calculator';
import { Opportunity } from '../models/opportunity';

@Injectable()
export class OpportunityService {

  private opportunitiesUrl       = '/api/1/opportunities';
  private opportunityGetUrl = '/api/1/opportunity';
  private opportunityAddUrl = '/api/1/opportunity';
  private opportunityUpdateUrl = '/api/1/opportunity';
  private opportunityDeleteUrl = '/api/1/opportunity';
  private opportunityMakePublicUrl = '/api/1/opportunity/:id/make-public';

  constructor(private http: Http) { }

  public getOpportunities(): Observable<Opportunity[]> {
    return this.http.get(this.opportunitiesUrl)
      .map(this.extractData)
      .share()
  }

  public getOpportunity(id: string): Observable<Opportunity> {
    return this.http.get(`${this.opportunityGetUrl}/${id}`)
      .map(this.extractData)
      .share()
  }

  public save(opportunity: Opportunity): Observable<Opportunity> {
    if (opportunity.id) {
      return this.put(opportunity);
    }
    return this.post(opportunity);
  }

  public delete(opportunity: Opportunity) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.opportunityDeleteUrl}/${opportunity.id}`;

    return this.http
      .delete(url, headers)
      .share()
  }

  public makePublic(opportunity: Opportunity): Observable<Opportunity>{
    let url = this.opportunityMakePublicUrl.replace(':id', opportunity.id);
    return this.http.get(url).map(this.extractData)
                             .share();
  }

  public exampleOpportunity(): Opportunity {
    let opportunity = new Opportunity();
    opportunity.name = "2 Example Street, Liverpool; 5 Bed HMO";
    opportunity.tenantNumber = 5;
    opportunity.rentPerTenantMonthly = 420;

    // expenses
    opportunity.billsYearly = 2000;
    opportunity.voids = 10;
    opportunity.management = 10;
    opportunity.maintenanceYearly = 1000;

    // opportunity
    opportunity.purchasePrice = 140000;
    opportunity.refurbCost = 20000;
    opportunity.legalFees = 1000;
    opportunity.stampDuty = 4500;

    // mortgage
    opportunity.mortgage = true;
    opportunity.paymentBasis = 'repayment';
    opportunity.mortgageType = 'buyToLet';
    opportunity.valuationBuyToLet = 180000;
    opportunity.multiplier = 7;
    opportunity.pullOutExtraMoney = false;
    opportunity.loanToValue = 75;
    opportunity.apr = 6;
    opportunity.term = 25;
    return opportunity;
  }

  private extractData(res: Response) {
    let extractDataSingle = function(opportunity: Object) {
      return Object.assign(new Opportunity(), opportunity);
    }

    let body = res.json();
    let data = body.data || {};

    if (data instanceof Array)
      return data.map(extractDataSingle);
    else
      return extractDataSingle(data);
  }

  // Add new Opportunity
  private post(opportunity: Opportunity): Observable<Opportunity> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.opportunityAddUrl, JSON.stringify(opportunity), { headers: headers })
      .map(this.extractData)
      .share()
  }

  // Update existing Opportunity
  private put(opportunity: Opportunity) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.opportunityUpdateUrl}/${opportunity.id}`;

    return this.http
      .put(url, JSON.stringify(opportunity), { headers: headers })
      .map(this.extractData)
      .share()
  }

}
