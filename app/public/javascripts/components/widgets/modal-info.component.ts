import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { MODAL_DIRECTVES, BS_VIEW_PROVIDERS, ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'modal-info',
  moduleId: module.id,
  templateUrl: 'modal-info.component.html',
  directives: [MODAL_DIRECTVES, CORE_DIRECTIVES],
  viewProviders: [BS_VIEW_PROVIDERS]
})
export class ModalInfoComponent {
  @Input() title: string = "Are you sure?";
  @Input() buttonClass: string = "btn btn-link";

  @ViewChild(ModalDirective) modal: ModalDirective;

  show(){
    this.modal.show();
  }

}
