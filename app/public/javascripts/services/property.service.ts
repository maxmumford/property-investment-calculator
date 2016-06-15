import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { Calculator } from '../models/calculator';
import { Property } from '../models/property';

@Injectable()
export class PropertyService {

  private propertiesUrl = '/api/1/properties';
  private propertyGetByIdUrl = '/api/1/property/';

  constructor(private http: Http) { }

  getProperties(): Observable<Property[]> {
    return this.http.get(this.propertiesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getProperty(id: string): Observable<Property> {
    return this.http.get(this.propertyGetByIdUrl + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let extractDataSingle = function(property: Object) {
      return Object.assign(new Property(), property);
    }

    let body = res.json();
    let data = body.data || {};
    
    if (data instanceof Array)
      return data.map(extractDataSingle);
    else
      return extractDataSingle(data);
  }

  public exampleProperty(): Property{
    let property = new Property();
    property.name = "2 Example Street, Liverpool; 5 Bed HMO";
    property.tenantNumber = 5;
    property.rentPerTenantWeekly = 100;

    // expenses
    property.billsYearly = 2000;
    property.voids = 10;
    property.management = 10;
    property.maintenanceYearly = 1000;

    // property
    property.purchasePrice = 140000;
    property.refurbCost = 20000;
    property.legalFees = 1000;
    property.stampDuty = 4500;

    // mortgage
    property.paymentBasis = 'repayment';
    property.mortgageType = 'buyToLet';
    property.valuationBuyToLet = 180000;
    property.multiplier = 7;
    property.pullOutExtraMoney = false;
    property.loanToValue = 75;
    property.apr = 6;
    property.term = 25;
    return property;
  }

  // save(property: Property): Observable<Property > {
  //   if (property.id) {
  //     return this.put(property);
  //   }
  //   return this.post(property);
  // }

  // delete(property: Property) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');

  //   let url = `${this.propertiesUrl}/${property.id}`;

  //   return this.http
  //     .delete(url, headers)
  //     .catch(this.handleError);
  // }

  // // Add new Property
  // private post(property: Property): Observable<Property > {
  //   let headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http
  //     .post(this.propertiesUrl, JSON.stringify(property), { headers: headers })
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

  // // Update existing Property
  // private put(property: Property) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');

  //   let url = `${this.propertiesUrl}/${property.id}`;

  //   return this.http
  //     .put(url, JSON.stringify(property), { headers: headers })
  //     .then(() => property)
  //     .catch(this.handleError);
  // }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
