import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { RoleManagementService } from '@shared/services/role-management.service';

@Component({
  selector: 'app-handler-edit-role',
  templateUrl: './handler-edit-role.component.html',
  styleUrls: ['./handler-edit-role.component.scss'],
})
export class HandlerEditRoleComponent extends BaseComponent implements OnInit {
  formGroup = this.fb.group({
    name: [''],
    description: [''],
    status: [''],
    createdBy: [''],
    createdDate: new Date(),
    modifiedBy: [''],
    modifiedDate: new Date(),
  });
  




  constructor( public roleSevice : RoleManagementService,
    public dialogRef: MatDialogRef<HandlerEditRoleComponent>,
    injector: Injector,
    @Inject(MAT_DIALOG_DATA) public formData: { data: any }
  ) {
    super(injector);
    this.updateForm();
  }

  ngOnInit(): void {
    console.log(this.formData.data);
    
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
    const params = {
      id: this.formData.data.id,
      ...valueForm
    }
    this.roleSevice.updateRole(params).subscribe()
  }
}
