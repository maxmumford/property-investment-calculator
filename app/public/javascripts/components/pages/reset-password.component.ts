import { Component, OnInit } from '@angular/core';
import { Router, RouteParams, RouteData } from '@angular/router-deprecated';
import { Response } from '@angular/http';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, Validators} from '@angular/common';

import { NotificationsService } from "angular2-notifications";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'reset-password',
  moduleId: module.id,
  templateUrl: 'reset-password.component.html',
  directives: [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES
  ],
})
export class ResetPasswordComponent implements OnInit {

  token: any;
  tokenValid: boolean = false;
  resetPasswordForm: any;

  constructor(
    private routeParams: RouteParams,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationsService,
    private formBuilder: FormBuilder) {

    this.resetPasswordForm = this.formBuilder.group({
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit(){
    this.token = this.routeParams.get('token');
    var self = this;
    this.userService.resetPassword(this.token).subscribe(function(response: Response){
      // token valid
      self.tokenValid = true;

    }, function(error: Response){
      // token invalid
      if(error.status == 403){
        self.notificationService.error("Link Has Expired",
          "Looks like your password reset link has expired (it's only valid for 1 hour)."
          + " Please use the 'forgot password' tool again to get a new link.", { timeOut: 20000 });
      } else {
        self.notificationService.error("Spanner in the works...",
          "Something went wrong while trying to reset your password!"
          + " Please try again in an hour or so", { timeOut: 20000 });
      }
    });
  }

  resetPassword(){
    if (!this.resetPasswordForm.dirty || !this.resetPasswordForm.valid) {
      return
    }

    let password = this.resetPasswordForm.value.password;
    var self = this;

    this.userService.resetPassword(this.token, password).subscribe(
      function(response: Response) {

        // successful
        self.notificationService.success("Welcome back!",
          "Your password has been changed and you have been automatically logged in");
        self.router.navigate(["Home"]);

      }, function(error: Response) {

        // error 
        if (error.json().error == "InvalidToken") {

          self.notificationService.error("Link has Expired",
            "The link in your password reset email is only valid for an hour to help keep accounts safe."
            + " Unfortunately it's been more than an hour since we sent the email. Please use the forgot"
            + " password tool again to get a new link.", { timeOut: 30000 });

        }
        else {
          console.log(error.json());
          self.notificationService.error("Something Went Wrong",
            "An error occured somewhere while trying to reset your password."
            + " We're on the case so try again in a few hours.");
        }

      }
    );
  }

}
