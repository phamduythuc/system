import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "@core/base.component";
import {Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectManagementService} from "../../project-management.service";

@Component({
  selector: 'app-add-or-edit-project',
  templateUrl: './add-or-edit-project.component.html',
  styleUrls: ['./add-or-edit-project.component.scss']
})
export class AddOrEditProjectComponent extends BaseComponent implements OnInit {

  dialogData: any;
  formGroup = this.fb.group({
    name: [null, Validators.required],
    code: [null,Validators.required],
    projectType: [null,Validators.required],
    budget: [null,Validators.required],
    startTime:[null],
    description: [null],
    actualEndTime: [null],
    expectEndTime: [null],
    status: [1, Validators.required],
  });
  projectTypes: any=[];

  constructor(injector: Injector,
              public dialogRef: MatDialogRef<AddOrEditProjectComponent>,
              private projectService: ProjectManagementService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, projectService, dialogRef);
    this.dialogData = data?.data;
  }

  ngOnInit(): void {
    if (this.dialogData) {
      this.formGroup.patchValue(this.dialogData);
    }
  }

  save(data) {
    console.log(this.searchModel)
    data.id = this.dialogData?.id || null
    this.addOrEdit(data)
  }

}
