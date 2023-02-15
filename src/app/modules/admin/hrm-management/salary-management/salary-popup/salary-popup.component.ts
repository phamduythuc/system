import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { TimeKeepingService } from '@shared/services/time-keeping.service';

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
    public timeKeepingService: TimeKeepingService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    super(injector, timeKeepingService, dialogRef);
  }

  ngOnInit(): void {
  }
  dowloadFile() {
    alert('Chưa có file');
  }
  save() {
    const formData = new FormData();
    const formValue = this.formGroup.value['timeKeepImport'];
    formData.append('file', this.formGroup.get('file').value || null);
    formData.append(
      'timeKeepImport', formValue
    );
    this.timeKeepingService.importTimeKeeping(formData).subscribe((res) => {
      const resp = decodeURIComponent(res.headers.get('Content-Response'));
      const obj = JSON.parse(resp);
      if ('00' === obj.code) {
        this.showSnackBar(obj.message, 'success');
      } else {
        this.showSnackBar(obj.message, 'error');
      }
    });
    this.dialogRef.close();
  }
  // uploadFile(event: any): void {
  //   const reader = new FileReader(); // HTML5 FileReader API
  //   const file = event.target.files[0];
  //   if (event.target.files && event.target.files[0]) {
  //     reader.readAsDataURL(file);
  //     this.fileUpload = file;
  //     this.detailsData.templateName = file.name;

  //     reader.onload = () => {
  //       this.fileURL = reader.result;
  //     };
  //   }
  // }
  uploadFile(event: any): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.formGroup.patchValue({ file });
      reader.onload = () => {
        // this.recordUrl = reader.result;
        this.documentName = file.name; 
        this.visibleBtnUpload = !this.visibleBtnUpload;
      };
    }
  }
}
