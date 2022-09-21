import {Component, Inject, Injector, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {SettingService} from "../../../setting.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BaseComponent} from "../../../../../../core/base.component";
import {CreateIpDialogComponent} from "./create-ip-dialog/create-ip-dialog.component";
import {FuseValidators} from "../../../../../../../@fuse/validators";

@Component({
    selector: 'app-add-or-edit-user',
    templateUrl: './add-or-edit-user.component.html',
    styleUrls: ['./add-or-edit-user.component.scss']
})
export class AddOrEditUserComponent extends BaseComponent implements OnInit {
    formGroup = this.fb.group({
        login: [null, [Validators.required]],
        firstName: [null, [Validators.required]],
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
        email: [null, [Validators.required]],
        phone: [null],
        team: [null,[Validators.required] ],
        authorities: [null,[Validators.required]],
        hdfsUserList: [null],
        userType: [1],
        userIpList: [null]
    }, {
        validators: FuseValidators.mustMatch('password', 'confirmPassword')
    });
    groups: any = [];
    userData: any;
    authorities: any = [];
    hdfsUsers: any = [];
    constructor(
        injector: Injector,
        public dialogRef: MatDialogRef<AddOrEditUserComponent>,
        private settingService: SettingService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        super(injector);
        this.groups = data?.groups;
        this.userData = data?.userData;
        this.authorities = data?.authorities;
    }

    ngOnInit(): void {
        this.settingService.getHdfsUser().subscribe(res=> {
            console.log(res);
            this.hdfsUsers = res.body.results;
            if (this.userData) {
                this.formGroup.patchValue(this.userData);
            }
        })
    }

    addIp() {
        this.showDialog(CreateIpDialogComponent, {width: "30vw"}, (value) => {
            if (value) {
                const ipList = this.formGroup.value.userIpList ?? [];
                ipList.push({ipAddress: value});
                this.formGroup.get('userIpList').patchValue(ipList);
            }
        })
    }

    removeIp(ip: any) {
        const ipList = this.formGroup.value.userIpList ?? [];
        const index = ipList.indexOf(ip);
        ipList.splice(index, 1);
        this.formGroup.get('userIpList').patchValue(ipList);
    }
}
