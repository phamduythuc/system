import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { SalaryService } from '@shared/services/salary.service';
import {CommonUtilsService} from "@shared/common-utils.service";

@Component({
  selector: 'app-salary-popup',
  templateUrl: './salary-popup.component.html',
  styleUrls: ['./salary-popup.component.scss']
})
export class SalaryPopupComponent extends BaseComponent implements OnInit {
  documentName: any;
  visibleBtnUpload: boolean = true;
  formGroup = this.fb.group({
    timeKeepImport: [],
    file: [''],
  });
  constructor( public dialogRef: MatDialogRef<SalaryPopupComponent>,
    injector: Injector,
   public salaryService: SalaryService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    super(injector, salaryService, dialogRef);
  }

  ngOnInit(): void {}
  dowloadFile() {
    alert('Chưa có file');
  }
  file: any;
  save() {
    const formData = new FormData();
    const data = {
      month: CommonUtilsService.dateToString(this.data.month)};
    // const data = CommonUtilsService.dateToString(this.data.month);
    // const dataTitle = this.formGroup.value;
    formData.append('file', this.file);
    formData.append(
      'month',
      new Blob([JSON.stringify(data)], { type: 'application/json' })
    );
      this.salaryService.saveImport(formData).subscribe(
        data1=> {
          console.log(data1);
          alert('ok');
        },error => {
          console.log(error);
        }
      );
  }
  fileUpload: any = {
    name: '',
    type: '',
    file: '',
  };
  uploadFile(event: any): void {
    // const reader = new FileReader(); // HTML5 FileReader API
    this.file = event.target.files[0];
    this.fileUpload.file = this.file;
    this.documentName = this.file.name;
    // this.formGroup.patchValue({ file });
    // reader.onload = () => {
    // this.fileUpload.file = this.file;
    // this.documentName = this.file.name;
    //   console.log(this.documentName)
    // };
  }
}
