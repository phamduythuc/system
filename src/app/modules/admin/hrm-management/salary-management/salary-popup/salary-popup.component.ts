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
  save() {
    const formData = new FormData();
    const data = this.formGroup.value;
    this.handleCoverTimeToString(data);
      formData.append('file', this.fileUpload.value || null);
      // formData.append(
      //   'data',
      //   new Blob([JSON.stringify(data)], { type: 'application/json' })
      // );
    console.log(formData);
      this.salaryService.saveImport(formData).subscribe();
  }
  fileUpload: any = {
    name: '',
    type: '',
    file: '',
  };
  uploadFile(event: any): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.formGroup.patchValue({ file });
      reader.onload = () => {
        this.fileUpload.file = file;
        this.documentName = file.name;
      };
    }
  }
}
