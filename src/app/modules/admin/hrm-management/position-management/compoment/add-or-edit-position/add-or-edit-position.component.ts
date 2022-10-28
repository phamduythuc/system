import {Component, Inject, Injector, OnInit,} from '@angular/core';
import {BaseComponent} from "@core/base.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PositionManagementService} from "../../position-management.service";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-add-or-edit-position',
  templateUrl: './add-or-edit-position.component.html',
  styleUrls: ['./add-or-edit-position.component.scss']
})
export class AddOrEditPositionComponent extends BaseComponent implements OnInit {
  private readonly dialogId: any;
  formGroup = this.fb.group({
    name: [null, Validators.required],
    description: [null],
    status: [1, Validators.required],
  });
tes = "common.description"
  constructor(injector: Injector,
              public dialogRef: MatDialogRef<AddOrEditPositionComponent>,
              private positionService: PositionManagementService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, positionService, dialogRef);
    this.dialogId = data?.id;
    if(this.dialogId){
      this.getDetails(this.dialogId);
    }
  }

  ngOnInit(): void {
  }

  save(data) {
    console.log(this.searchModel)
    data.id = this.dialogId || null
    this.addOrEdit(data)
  }
}
