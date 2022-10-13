import {Component, Inject, inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "@core/base.component";
import {TeamManagementService} from "../team-management.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-or-edit-team',
  templateUrl: './add-or-edit-team.component.html',
  styleUrls: ['./add-or-edit-team.component.scss']
})
export class AddOrEditTeamComponent extends BaseComponent implements OnInit {
  dialogId: any;
  stepFormGroup: any

  constructor(injector: Injector,
              teamService: TeamManagementService,
              dialogRef: MatDialogRef<AddOrEditTeamComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, teamService, dialogRef);
    this.dialogId = data?.id;
    if (this.dialogId) {
      this.getDetails(this.dialogId);
    }
  }

  ngOnInit(): void {
    this.stepFormGroup = this.fb.group({
      step1: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        language: ['', Validators.required]
      }),
      step2: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        about: ['']
      }),
      // step3: this.fb.group({
      //   byEmail          : this.fb.group({
      //     companyNews     : [true],
      //     featuredProducts: [false],
      //     messages        : [true]
      //   }),
      //   pushNotifications: ['everything', Validators.required]
      // })
    });

  }

  save(value: any) {
    return false;
  }
}
