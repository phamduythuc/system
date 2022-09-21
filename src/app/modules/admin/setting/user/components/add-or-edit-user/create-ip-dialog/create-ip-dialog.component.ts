import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseComponent} from "../../../../../../../core/base.component";
import {Validators} from "@angular/forms";

@Component({
    selector: 'app-create-ip-dialog',
    templateUrl: './create-ip-dialog.component.html',
    styleUrls: ['./create-ip-dialog.component.scss']
})
export class CreateIpDialogComponent extends BaseComponent implements OnInit {
    formGroup = this.fb.group({
        ipAddress: [null, [Validators.required]]
    })

    constructor(
        injector: Injector,
        public dialogRef: MatDialogRef<CreateIpDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super(injector);
    }

    ngOnInit(): void {
    }

}
