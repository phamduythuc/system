import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../core/base.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Validators} from '@angular/forms';
import {DepartmentService} from '@shared/services/department.service';

@Component({
  selector: 'app-add-or-edit-department',
  templateUrl: './add-or-edit-department.component.html',
  styleUrls: ['./add-or-edit-department.component.scss']
})
export class AddOrEditDepartmentComponent extends BaseComponent implements OnInit {
  formGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(100)]],
    code: [null, [Validators.required, Validators.maxLength(50)]],
    description: [null],
    parentId: [null],
    status: [1]
  });
  dialogId: any = null;
  departments: any[] = [];

  constructor(injector: Injector,
              public dialogRef: MatDialogRef<AddOrEditDepartmentComponent>,
              private departmentService: DepartmentService,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    super(injector, departmentService, dialogRef);
    this.dialogId = dialogData?.id;
    if(this.dialogId){
      this.getDetails(this.dialogId);
    }
    this.departments = dialogData?.departments;
  }

  ngOnInit(): void {
    // if (this.department) {
    //   this.formGroup.patchValue(this.department);
    // }

  }

  save(data) {
    data.id = this.dialogId||null;
    this.addOrEdit(data);
    // this.dialogRef.close(data)
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
