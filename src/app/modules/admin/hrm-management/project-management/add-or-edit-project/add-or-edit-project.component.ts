import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {AbstractControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProjectService} from '@shared/services/project.service';
import {CategoriesService} from '@core/categories.service';
import moment from 'moment';
import {CommonUtilsService} from '@shared/common-utils.service';
import {PartnerService} from '@shared/services/partner.service';
import { datePickerValidator } from '@shared/validation/date-picker.validation';



@Component({
  selector: 'app-add-or-edit-project',
  templateUrl: './add-or-edit-project.component.html',
  styleUrls: ['./add-or-edit-project.component.scss']
})
export class AddOrEditProjectComponent extends BaseComponent implements OnInit {
  panelOpenState = false;
  dialogId: any;
  formGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(100)]],
    code: [null, [Validators.required, Validators.maxLength(100)]],
    projectType: [null, Validators.required],
    projectTypeName: [null],
    budget: [null, Validators.required],
    unitPrice: [null, Validators.required],
    startTime: [null, datePickerValidator()],
    // parentId:[null,Validators.required],
    partnerId:[null,Validators.required],
    description: [null, Validators.maxLength(255)],
    actualEndTime: [null],
    expectEndTime: [null, datePickerValidator()],
    contactName: [null ,[Validators.maxLength(100) ,Validators.required]],
    contactPhone: [null ,[Validators.pattern('(\\(\\+84\\)|0)+([0-9]{9})\\b'), Validators.required]],
    contactMail: [null ,[Validators.required,Validators.pattern('^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$')]],

    status: [1, Validators.required],
  });

  date: any;
  projectData: any;
  projectTypes: any = [];
  projects: any = [];
  listPartner: any = [];

  constructor(injector: Injector,
              private categories: CategoriesService,
              public dialogRef: MatDialogRef<AddOrEditProjectComponent>,
              private projectService: ProjectService,
              private partnerService: PartnerService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, projectService, dialogRef);
    this.dialogId = data?.id;
    this.projects=data?.projects;
    this.getCategories();
    this.getListPartner();
    if(this.dialogId){
      this.getDetails(this.dialogId);
    }

  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(form =>{
      if(form.unitPrice){
        this.formGroup.patchValue({
          unitPrice: CommonUtilsService.formatCurrency(form.unitPrice)
        }, {emitEvent: false});
      }
      if(form.budget){
        this.formGroup.patchValue({
          budget: CommonUtilsService.formatCurrency(form.budget)
        }, {emitEvent: false});
      }
    });
  }

  onChange(data){
    this.projectTypes.map((x: any)=>{
      console.log(data.value);

      if(x.name === data.value){
        this.formGroup.controls.projectType.setValue(Number(x.code));
      }
      return x;
    });
  }

  getDetails(id): any {
    this.projectService.getOne(id).subscribe(res=>{
      if(res.code==='00'){
        this.projectData = res.data;
        if(this.projectData){
          this.projectTypes.map((x: any)=>{
            if(Number(x?.code) === this.projectData?.projectType){
              this.projectData.projectType =x.code;
              this.projectData.projectTypeName = x.name;
            }
            return x;
          });

          this.projectData.startTime = this.projectData.startTime&&new Date(+this.projectData.startTime);
          this.projectData.actualEndTime = this.projectData.actualEndTime&&new Date(+this.projectData.actualEndTime);
          this.projectData.expectEndTime = this.projectData.expectEndTime&&new Date(+this.projectData.expectEndTime);
          this.formGroup.patchValue(this.projectData);
        }
      }else {
        this.showSnackBar(res.message,  'error');
        this.dialogService.closeAll();
      }
    },error => {
      this.showSnackBar(error.message,  'error');
      this.dialogService.closeAll();
    });
  }

  getListPartner(){
    this.partnerService.search().subscribe(res=>{
      // this.listPartner = res.data;
      res.data.forEach((itemStatus) => {
        console.log(itemStatus);

        if (itemStatus.status == 1) {

          this.listPartner.push(itemStatus);
        }
      });
    });
  }

  getCategories() {
    this.categories.getCategories('PROJECT_TYPE').subscribe(res => {
      this.projectTypes = res.data;
    });
  }

  save(data) {
    data.unitPrice = data.unitPrice.replace(/,/g, '');
    data.budget = data.budget.replace(/,/g, '');
    data.startTime=data.startTime&&CommonUtilsService.dateToString(data.startTime);
    data.expectEndTime=data.expectEndTime&&CommonUtilsService.dateToString(data.expectEndTime);
    data.actualEndTime=data.actualEndTime&&CommonUtilsService.dateToString(data.actualEndTime);
    data.id = this.dialogId || null;
    this.addOrEdit(data);
  }
}
