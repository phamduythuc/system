import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../../core/base.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Validators} from "@angular/forms";
import {data} from "autoprefixer";
import {DepartmentManagementService} from "../department-management.service";
import moment from "moment";

@Component({
  selector: 'app-add-or-edit-department',
  templateUrl: './add-or-edit-department.component.html',
  styleUrls: ['./add-or-edit-department.component.scss']
})
export class AddOrEditDepartmentComponent extends BaseComponent implements OnInit {
  formGroup = this.fb.group({
    name: [null, [Validators.required]],
    code: [null, [Validators.required]],
    description: [null],
    parentId: [null],
    status: [1]
  });
  department: any;
  departments:[]

  constructor(injector: Injector, public dialogRef: MatDialogRef<AddOrEditDepartmentComponent>,
              private departmentService: DepartmentManagementService,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    super(injector);
    this.department = dialogData?.department;
    this.departments = dialogData?.departments
    console.log(this.departments);
  }

  ngOnInit(): void {
    if (this.department) {
      this.formGroup.patchValue(this.department);
    }

  }
  save(data) {
    console.log(this.searchModel)
    data.id = this.department?.id||null
    this.dialogRef.close(data)
  }
  // save(): void {
  //   const body = {
  //     ...this.formGroup.value,
  //   };
  //   if (this.department) {
  //     body.id = this.department.id;
  //     this.departmentService.update(body).subscribe((res) => {
  //       if (res.status === 200) {
  //         this.showSnackBar('Cập nhật bản ghi thành công', 'success');
  //         this.dialogRef.close('reload');
  //       }
  //     });
  //   } else {
  //     this.departmentService.save(body).subscribe((res) => {
  //       if (res.status === 200) {
  //         this.showSnackBar('Thêm mới bản ghi thành công', 'success');
  //         this.dialogRef.close('reload');
  //       }
  //     });
  //   }
  // }
}
