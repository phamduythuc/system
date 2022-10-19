import {ChangeDetectorRef, Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../../core/base.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SettingService} from "../../setting.service";
import {Validators} from "@angular/forms";

@Component({
    selector: 'app-add-or-edit-auth',
    templateUrl: './add-or-edit-auth.component.html',
    styleUrls: ['./add-or-edit-auth.component.scss']
})
export class AddOrEditAuthComponent extends BaseComponent implements OnInit {
    role: any;
    formGroup = this.fb.group({
        name: [null, [Validators.required]],
        activated: [null],
        description: [null]
    });
    constructor(injector: Injector, public dialogRef: MatDialogRef<AddOrEditAuthComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private settingService: SettingService) {
        super(injector);
        this.role = data?.role;
        console.log(this.role);
        if(this.role){
            this.formGroup.patchValue(this.role);
        }
    }

    ngOnInit(): void {
    }

    // save() {
    //     if(this.role){
    //         const data = {
    //             id: this.role.id,
    //             ...this.formGroup.value
    //         };
    //         this.settingService.updateRoleGroup(data).subscribe(res => {
    //             if(res){
    //                 this.showSnackBar('Cập nhật quyền thành công', 'success');
    //                 this.dialogRef.close('reload');
    //             }
    //         });
    //     }else{
    //         this.settingService.addRoleGroup(this.formGroup.value).subscribe(res => {
    //             if(res){
    //                 this.showSnackBar('Thêm mới bản ghi thành công', 'success');
    //                 this.dialogRef.close('reload');
    //             }
    //         });
    //     }
    // }
}
