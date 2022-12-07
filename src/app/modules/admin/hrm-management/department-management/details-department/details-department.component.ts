import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '@shared/services/department.service';
import { BaseComponent } from '@core/base.component';
import { AddOrEditDepartmentComponent } from '../add-or-edit-department/add-or-edit-department.component';

@Component({
  selector: 'app-details-department',
  templateUrl: './details-department.component.html',
  styleUrls: ['./details-department.component.scss'],
})
export class DetailsDepartmentComponent
  extends BaseComponent
  implements OnInit
{
  private readonly dialogId: any;
  departments: any = [];
  detailsData_1: any;
  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<AddOrEditDepartmentComponent>,
    private departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    super(injector, departmentService, dialogRef);
    this.dialogId = dialogData?.id;
    if (this.dialogId) {
      this.getDetails(this.dialogId, null, dialogData?.departments);
    }

    this.departments = dialogData?.departments;
  }

  ngOnInit(): void {}
}
