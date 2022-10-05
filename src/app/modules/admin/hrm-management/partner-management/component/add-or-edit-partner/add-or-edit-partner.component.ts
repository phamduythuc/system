import {Component, Inject, Injector, OnInit} from '@angular/core';
import {Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseComponent} from "@core/base.component";
import {PartnerService} from "../../partner.service";

@Component({
  selector: 'app-add-or-edit-partner',
  templateUrl: './add-or-edit-partner.component.html',
  styleUrls: ['./add-or-edit-partner.component.scss']
})
export class AddOrEditPartnerComponent extends BaseComponent implements OnInit {

  partnerData: any;
  formGroup = this.fb.group({
    name: [null,Validators.required],
    phone:[null,Validators.required],
    address:[null],
    note: [null],
  });
  constructor(injector: Injector,
              public dialogRef: MatDialogRef<AddOrEditPartnerComponent>,
              private partnerService: PartnerService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, partnerService, dialogRef);
    this.partnerData = data?.partnerData;
  }

  ngOnInit(): void {
    if (this.partnerData) {
      this.formGroup.patchValue(this.partnerData);
    }
  }

  save(data) {
    console.log(this.searchModel)
    data.id = this.partnerData?.id||null
    this.addOrEdit(data)
    // this.dialogRef.close(data)
  }

}
