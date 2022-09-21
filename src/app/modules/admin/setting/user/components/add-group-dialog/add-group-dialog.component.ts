import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {SettingService} from "../../../setting.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BaseComponent} from "../../../../../../core/base.component";

@Component({
    selector: 'app-add-group-dialog',
    templateUrl: './add-group-dialog.component.html',
    styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent extends BaseComponent implements OnInit {
    formGroup = this.fb.group({
        id: [null],
        name: [null, [Validators.required]],
        groupAcc: [null, [Validators.required]],
        description: [null],
        activated: [1]
    })
    constructor(
        injector: Injector,
        public dialogRef: MatDialogRef<AddGroupDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private settingService: SettingService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        if (this.data) {
            this.formGroup.patchValue({
                id: this.data.id,
                name: this.data.name,
                groupAcc: this.data.groupAcc,
                description: this.data.description,
                activated: this.data.activated,
            });
        }
    }

    save() {
        this.settingService.addOrEditGroup(this.formGroup.value).subscribe(res => {
            if (res.status === 200) {
                this.showSnackBar(this.formGroup.value.id ? 'Cập nhật thành công' : 'Thêm mới thành công', 'success');
                this.dialogRef.close('success');
            }
        })
    }
}
