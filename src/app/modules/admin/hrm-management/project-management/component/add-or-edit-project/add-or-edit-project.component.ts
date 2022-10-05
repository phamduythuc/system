import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "@core/base.component";
import {AbstractControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectManagementService} from "../../project-management.service";
import {CategoriesService} from "@core/categories.service";
import moment from "moment";
import {CommonUtilsService} from "@shared/common-utils.service";
import {PartnerService} from "../../../partner-management/partner.service";

@Component({
  selector: 'app-add-or-edit-project',
  templateUrl: './add-or-edit-project.component.html',
  styleUrls: ['./add-or-edit-project.component.scss']
})
export class AddOrEditProjectComponent extends BaseComponent implements OnInit {

  dialogData: any;
  formGroup = this.fb.group({
    name: [null, Validators.required],
    code: [null, Validators.required],
    projectType: [null, Validators.required],
    budget: [null, Validators.required],
    startTime: [null,Validators.required],
    parentId:[],
    partnerId:[],
    description: [null],
    actualEndTime: [null],
    expectEndTime: [null,Validators.required],
    status: [1, Validators.required],
  });
  projectTypes: any = [];
  projects: any = [];
  listPartner: any = [];

  constructor(injector: Injector,
              private categories: CategoriesService,
              public dialogRef: MatDialogRef<AddOrEditProjectComponent>,
              private projectService: ProjectManagementService,
              private partnerService: PartnerService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, projectService, dialogRef);
    this.dialogData = data?.data;
    this.projects=data?.projects
    this.getCategories()
    this.getListPartner()
  }

  ngOnInit(): void {
    if (this.dialogData) {
      this.dialogData.startTime = this.dialogData.startTime&&new Date(+this.dialogData.startTime)
      this.dialogData.actualEndTime = this.dialogData.actualEndTime&&new Date(+this.dialogData.actualEndTime)
      this.dialogData.expectEndTime = this.dialogData.expectEndTime&&new Date(+this.dialogData.expectEndTime)
      this.formGroup.patchValue(this.dialogData);
    }
    console.log(this.formGroup);
  }

  getListPartner(){
    this.partnerService.search().subscribe(res=>{
      this.listPartner = res.data
    })
  }

  getCategories() {
    this.categories.getCategories('PROJECT_TYPE').subscribe(res => {
      this.projectTypes = res.data;
    })
  }

  save(data) {
    data.startTime=data.startTime&&CommonUtilsService.dateToString(data.startTime)
    data.expectEndTime=data.expectEndTime&&CommonUtilsService.dateToString(data.expectEndTime)
    data.actualEndTime=data.actualEndTime&&CommonUtilsService.dateToString(data.actualEndTime)
    console.log(this.searchModel)
    data.id = this.dialogData?.id || null
    this.addOrEdit(data)
  }
}
