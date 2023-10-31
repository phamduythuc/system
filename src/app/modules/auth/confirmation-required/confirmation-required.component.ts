import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {FormControl, Validators} from "@angular/forms";
import {f} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'auth-confirmation-required',
  templateUrl: './confirmation-required.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AuthConfirmationRequiredComponent implements OnInit {
  /**
   * Constructor
   */
  verifyControl: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*$')]);
  checkLength: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    this.verifyControl.valueChanges.subscribe(value => {
        if (value.length === 6 && !this.verifyControl.invalid) {
          this.checkLength = false;
        }else {this.checkLength = true;}
      }
    );
  }
}
