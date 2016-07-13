import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgSwitch, NgSwitchWhen } from '@angular/common';
import { Router, RouteParams } from '@angular/router-deprecated';
import { Response } from '@angular/http';

import { Calculator } from '../../models/calculator';
import { Opportunity } from '../../models/opportunity';
import { User } from '../../models/user';

import { NotificationsService } from "angular2-notifications";
import { OpportunityService } from '../../services/opportunity.service';
import { UserService } from '../../services/user.service';

import { ModalConfirmComponent } from '../widgets/modal-confirm.component';
import { ModalInfoComponent } from '../widgets/modal-info.component';

import { ClipboardDirective } from 'angular2-clipboard';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'calculator-controls',
  moduleId: module.id,
  templateUrl: 'calculator-controls.component.html',
  styleUrls: ['calculator-controls.component.css'],
  directives: [ 
    ModalConfirmComponent, 
    ModalInfoComponent,
    ClipboardDirective,
    TOOLTIP_DIRECTIVES,
    NgSwitch, 
    NgSwitchWhen
  ]
})
export class CalculatorControlsComponent {
  @Input() calculator: Calculator;
  @Output('calculator') calculatorChange = new EventEmitter();

  sharableUrl;

  constructor(
    private opportunityService: OpportunityService,
    private notificationService: NotificationsService,
    private router: Router,
    private params: RouteParams,
    private userService: UserService) {
    let opportunityId = params.get('opportunityId');
    if (opportunityId)
      this.sharableUrl = window.location.href;
  }

  save(){
    // if user is not logged in show the login dialog
    if (!this.userService.user){
      var self = this;
      this.userService.showLoginModal(function(user: any){
        self.save();
      });
      return;
    }

    // check a name has been entered
    if(this.calculator.opportunity.name.length == 0){
      this.notificationService.error("Please Enter a Name", 
        "You'll need to enter a name for this calculation before you can save it."
        + " How about the address of the property?");
      return;
    }

    // otherwise save their opportunity
    var self = this;
    this.opportunityService.save(this.calculator.opportunity).subscribe(
      function(opportunity) {
        if (self.calculator.opportunity.isNewDocument()) {
          self.notificationService.success("Saved", "Your new calculation has been saved; huzzah!");
          self.router.navigate(['CalculatorLoad', { opportunityId: opportunity.id }]);
        }
        else{
          self.notificationService.success("Saved", "Your calculation has been saved; huzzah!");
        }
      },
      function(error) {
        console.log('Got an error while trying to save an opportunity', error);
        self.notificationService.error("Can't Save Right Now",
          "Something went wrong while trying to save the calculator."
          + " Keep this window open and try again in an hour or so."
          + " We'll get this issue fixed asap.");
      }
    );
    this.opportunityService.save(this.calculator.opportunity);
  }

  reset(confirmReset){
    confirmReset.hide();
    this.router.navigate(['Calculator']);
    this.calculator = new Calculator(this.userService);
    this.calculatorChange.emit(this.calculator);
  }

  makePublic(){
    var self = this;
    this.opportunityService.makePublic(this.calculator.opportunity).subscribe(function(opportunity){
      self.calculator.opportunity.isPublic = true;
    }, function(error: Response){
      self.notificationService.error("Could Not Make Sharable",
        "Something went wrong while trying to make your calculation sharable."
        + " We are aware of this issue and hope to have it fixed soon.");
    });
  }

  sharableUrlCopied(){
    this.notificationService.success("Sharable URL Copied",
      "Your calculator's sharable URL has been copied."
      + " You can now send it to other people so they can view your calculation."
      + " Just press CTRL + V (or CMD + V on a Mac) to paste it into an email or message etc.",
      {timeOut: 20000});
  }

  sharableUrlCopyFailed($event){
    console.log($event);
    this.notificationService.error("Couldn't Copy",
      "Oops, couldn't copy the URL to your clipboard. Maybe your web browser isn't supported."
      + " You can instead copy the text manually by highlighting it and pressing"
      + " CTRL + C (or CMD + C on a Mac).", { timeOut: 20000 });
  }

  shareTooltip(){
    if (this.calculator.opportunity.isNewDocument())
      return "You must save your calculation before you can share it";
    else
      return "";
  }

}
