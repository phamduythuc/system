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

  diaLogId;
  formGroup = this.fb.group({
    name: [null,Validators.required],
    phone:[null,[Validators.required,Validators.pattern('[0-9]{10}')]],
    address:[null],
    note: [null],
  });
  constructor(injector: Injector,
              public dialogRef: MatDialogRef<AddOrEditPartnerComponent>,
              private partnerService: PartnerService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, partnerService, dialogRef);
    this.diaLogId = data?.id;
    if(this.diaLogId){
      this.getDetails(this.diaLogId);
    }
  }

  ngOnInit(): void {
  }

  save(data) {
    console.log(this.searchModel)
    data.id = this.diaLogId||null
    this.addOrEdit(data)
    // this.dialogRef.close(data)
  }

}
