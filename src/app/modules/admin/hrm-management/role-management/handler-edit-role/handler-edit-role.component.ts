import { FormBuilder, FormControl } from '@angular/forms';
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
    createdDate: new Date(),
    modifiedBy: [''],
    modifiedDate: new Date(),
  });
  




  constructor(
    public dialogRef: MatDialogRef<HandlerEditRoleComponent>,
    injector: Injector,
    @Inject(MAT_DIALOG_DATA) public formData: { data: any }
  ) {
    super(injector);
    this.updateForm();
  }

  ngOnInit(): void {
    
  }
  updateForm() {
    if (this.formData.data) {
      this.handleCoverStringToDate(this.formData.data);
      this.formGroup.patchValue(this.formData.data)
    }
  }
  save() {
    let valueForm = this.formGroup.getRawValue();
    console.log(valueForm);
    this.dialogRef.close();
  }
}
