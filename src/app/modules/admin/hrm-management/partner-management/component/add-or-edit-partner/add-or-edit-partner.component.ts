import {Component, Inject, Injector, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BaseComponent} from '@core/base.component';
import {PartnerService} from '@shared/services/partner.service';

@Component({
  selector: 'app-add-or-edit-partner',
  templateUrl: './add-or-edit-partner.component.html',
  styleUrls: ['./add-or-edit-partner.component.scss']
})
export class AddOrEditPartnerComponent extends BaseComponent implements OnInit {
  dialogId;

  formGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(100)]],
    phone:[null, [Validators.required, Validators.pattern('(\\(\\+84\\)|0)+([0-9]{9})\\b')]],
    address:[null],
    note: [null],
  });
  constructor(injector: Injector,
              public dialogRef: MatDialogRef<AddOrEditPartnerComponent>,
              private partnerService: PartnerService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, partnerService, dialogRef);
    this.dialogId = data?.id;
    if(this.dialogId){
      this.getDetails(this.dialogId);
    }
  }

  ngOnInit(): void {
  }

  save(data) {
    data.id = this.dialogId||null;
    this.addOrEdit(data);
  }

}
