import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { MODAL_DIRECTVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'modal-confirm',
  moduleId: module.id,
  templateUrl: 'modal-confirm.component.html',
  directives: [MODAL_DIRECTVES, CORE_DIRECTIVES],
  viewProviders: [BS_VIEW_PROVIDERS]
})
export class ModalConfirmComponent {
}
