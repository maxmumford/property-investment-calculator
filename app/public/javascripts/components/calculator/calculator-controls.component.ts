import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { Calculator } from '../../models/calculator';
import { Property } from '../../models/property';

import { NotificationsService } from "angular2-notifications";
import { PropertyService } from '../../services/property.service';

import { ModalConfirmComponent } from '../widgets/modal-confirm.component';
import { ModalInfoComponent } from '../widgets/modal-info.component';

import { ClipboardDirective } from 'angular2-clipboard';

@Component({
  selector: 'calculator-controls',
  moduleId: module.id,
  templateUrl: 'calculator-controls.component.html',
  styleUrls: ['calculator-controls.component.css'],
  directives: [ 
    ModalConfirmComponent, 
    ModalInfoComponent,
    ClipboardDirective
  ]
})
export class CalculatorControlsComponent {
  @Input() calculator;
  @Output('calculator') calculatorChange = new EventEmitter();

  sharableUrl;

  constructor(
    private propertyService: PropertyService,
    private notificationService: NotificationsService,
    private router: Router,
    private params: RouteParams) {
    let propertyId = params.get('propertyId');
    if (propertyId)
      this.sharableUrl = window.location.href;
  }

  save(){
    let self = this;
    this.propertyService.save(this.calculator.property).subscribe(
      function(property) {
        if (self.calculator.property.isNewDocument()) {
          self.notificationService.success("Saved", "Your new calculation has been saved; huzzah!");
          self.router.navigate(['CalculatorLoad', { propertyId: property.id }]);
        }
        else{
          self.notificationService.success("Saved", "Your calculation has been saved; huzzah!");
        }
      },
      function(error) {
        console.log('Got an error while trying to save a property', error);
        self.notificationService.error("Can't Save Right Now",
          "Something went wrong while trying to save the property."
          + " Keep this window open and try again in an hour or so."
          + " We'll get this issue fixed asap.");
      }
    );
    this.propertyService.save(this.calculator.property);
  }

  reset(){
    this.router.navigate(['Calculator']);
    this.calculator = new Calculator();
    this.calculatorChange.emit(this.calculator);
  }

  sharableUrlCopied(){
    this.notificationService.success("Sharable URL Copied",
      "Your calculator's sharable URL has been copied."
      + " You can now send it to other people so they can view your calculation."
      + " Just press CTRL + C (or CMD + C on a Mac) to paste it into an email or message etc.",
      {timeOut: 20000});
  }

  sharableUrlCopyFailed($event){
    console.log($event);
    this.notificationService.error("Couldn't Copy",
      "Oops, couldn't copy the URL to your clipboard. Maybe your web browser isn't supported."
      + " You can instead copy the text manually by highlighting it and pressing"
      + " CTRL + C (or CMD + C on a Mac).", { timeOut: 20000 });
  }

}
