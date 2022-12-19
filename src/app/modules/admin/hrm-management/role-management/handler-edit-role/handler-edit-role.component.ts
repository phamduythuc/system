import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';

@Component({
  selector: 'app-handler-edit-role',
  templateUrl: './handler-edit-role.component.html',
  styleUrls: ['./handler-edit-role.component.scss'],
})
export class HandlerEditRoleComponent extends BaseComponent implements OnInit {
  formGroup = this.fb.group({
    fullName: [''],
    description: [''],
    status: [''],
    createdBy: [''],
    createdDate: [''],
    modifiedBy: [''],
    modifiedDate: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<HandlerEditRoleComponent>,
    injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: { data: any }
  ) {
    super(injector);
    this.updateForm();
  }

  ngOnInit(): void {
    
  }
  updateForm() {
    if (this.data.data) {
      this.formGroup.controls.fullName.setValue(this.data.data.fullName);
      this.formGroup.controls.description.setValue(this.data.data.description);
      this.formGroup.controls.status.setValue(this.data.data.status);
      this.formGroup.controls.createdBy.setValue(this.data.data.createdBy);
      this.formGroup.controls.createdDate.setValue(this.data.data.createdDate);
      this.formGroup.controls.modifiedBy.setValue(this.data.data.modifiedBy);
      this.formGroup.controls.modifiedDate.setValue(this.data.data.modifiedDate);
    }
  }
  save() {
    let valueForm = this.formGroup.getRawValue();
    console.log(valueForm);
  }
}
