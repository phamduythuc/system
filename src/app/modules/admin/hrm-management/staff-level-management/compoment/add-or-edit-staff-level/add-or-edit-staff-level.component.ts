import {Component, Inject, Injector, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BaseComponent} from '@core/base.component';
import {StaffLevelService} from '@shared/services/staff-level.service';

@Component({
  selector: 'app-add-or-edit-staff-level',
  templateUrl: './add-or-edit-staff-level.component.html',
  styleUrls: ['./add-or-edit-staff-level.component.scss']
})
export class AddOrEditStaffLevelComponent extends BaseComponent implements OnInit {

  dialogId: any;
  formGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(50)]],
    description: [null, Validators.maxLength(500)],
    status: [1, Validators.required],
  });

  constructor(injector: Injector,
              public dialogRef: MatDialogRef<AddOrEditStaffLevelComponent>,
              private staffLevelService: StaffLevelService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, staffLevelService, dialogRef);
    this.dialogId = data?.id;
    if (this.dialogId) {
      this.getDetails(this.dialogId);
    }
  }

  ngOnInit(): void {
  }

  save(data) {
    data.id = this.dialogId || null;
    this.addOrEdit(data);
  }

}
