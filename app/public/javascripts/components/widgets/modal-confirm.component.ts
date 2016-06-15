import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { MODAL_DIRECTVES, BS_VIEW_PROVIDERS, ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'modal-confirm',
  moduleId: module.id,
  templateUrl: 'modal-confirm.component.html',
  directives: [MODAL_DIRECTVES, CORE_DIRECTIVES],
  viewProviders: [BS_VIEW_PROVIDERS]
})
export class ModalConfirmComponent {
  @Input() title: string = "Are you sure?";
  @Input() question: string = null;
  @Input() positive: string = "Yes";
  @Input() negative: string = "No";
  @Input() positiveClass: string = "btn btn-primary";
  @Input() negativeClass: string = "btn btn-link";

  @Output('positive') onPositive = new EventEmitter();
  @Output('negative') onNegative = new EventEmitter();

  @ViewChild(ModalDirective) modal: ModalDirective;

  show(){
    this.modal.show();
  }

  hide(){
    this.modal.hide();
  }

  clickPositive(){
    this.onPositive.emit(null);
    this.hide();
  }

  clickNegative(){
    this.onNegative.emit(null);
    this.hide();
  }

}
