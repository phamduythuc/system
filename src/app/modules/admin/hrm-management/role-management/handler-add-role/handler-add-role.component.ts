import { BaseComponent } from '@core/base.component';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleManagementService } from '@shared/services/role-management.service';

@Component({
  selector: 'app-handler-add-role',
  templateUrl: './handler-add-role.component.html',
  styleUrls: ['./handler-add-role.component.scss'],
})
export class HandlerAddRoleComponent extends BaseComponent implements OnInit {
  formGroup = this.fb.group({
    name: [''],
    description: [''],
    status: [''],
    createdBy: [''],
    createdDate: [''],
    modifiedBy: [''],
    modifiedDate: [''],
  });
  constructor( public roleManagementService: RoleManagementService,
    public dialogRef: MatDialogRef<HandlerAddRoleComponent>,
    injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: { data: any }
  ) {
    super(injector);
  }
  ngOnInit(): void {}

  handerSave() {
    this.dialogRef.close();
    this.roleManagementService.createRole(this.formGroup.value).subscribe(
       res => {
            if(res.code == '00') {
              this.showSnackBar(res.message, 'success');
            }
            else {
              this.showSnackBar(res.message, 'error');
            }
          }
    );
    
  }
}
