import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { SalaryService } from '@shared/services/salary.service';
import {CommonUtilsService} from '@shared/common-utils.service';

@Component({
  selector: 'app-salary-popup',
  templateUrl: './salary-popup.component.html',
  styleUrls: ['./salary-popup.component.scss']
})
export class SalaryPopupComponent extends BaseComponent implements OnInit {
  documentName: any;
  formGroup = this.fb.group({
    timeKeepImport: [],
    file: [],
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
  fileUpload: any = {
    name: '',
    type: '',
    file: '',
  };
  fileURL: any;
  uploadFile(event: any): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.fileUpload.file = file;
      this.documentName = file.name;
      reader.onload = () => {
        this.fileURL = reader.result;
    };
    }
  }
  save() {
    const formData = new FormData();
    const dataMonth = CommonUtilsService.dateToString(this.data.month);
    formData.append('file', this.fileUpload.file);
    this.salaryService.saveImport(dataMonth, formData).subscribe();
    this.dialogRef.close();
  }
}
