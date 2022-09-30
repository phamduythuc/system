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
        createdBy: [null],
        createdDate: [null],
        description: [null],
        modifiedBy: [null],
        modifiedDate: [null],
        parentId: [null],
        status: [null]
    });
    department: any;

    constructor(injector: Injector, public dialogRef: MatDialogRef<AddOrEditDepartmentComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, private departmentService: DepartmentManagementService) {
        super(injector);
        this.department = data?.department;
        this.department && this.formGroup.patchValue(this.department);
    }

    ngOnInit(): void {
    }

    save(): void {
        const body = {
            ...this.formGroup.value,
            createdDate:this.formGroup.value.createdDate && moment(new Date(this.formGroup.value.createdDate)).format('DD/MM/yyyy hh:mm:ss'),
            modifiedDate:this.formGroup.value.modifiedDate && moment(new Date(this.formGroup.value.modifiedDate)).format('DD/MM/yyyy hh:mm:ss')
        };
        if (this.department) {
            body.id = this.department.id;
            this.departmentService.updateDepartment(body).subscribe((res) => {
                if (res.status === 200) {
                    this.showSnackBar('Cập nhật bản ghi thành công', 'success');
                    this.dialogRef.close('reload');
                }
            });
        } else {
            this.departmentService.addDepartment(body).subscribe((res) => {
                if (res.status === 200) {
                    this.showSnackBar('Thêm mới bản ghi thành công', 'success');
                    this.dialogRef.close('reload');
                }
            });
        }
    }
}
