import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

import { BaseComponent } from '@core/base.component';
import { AchievementService } from '@shared/services/achievement.service';
import FileSaver from 'file-saver';
import { datePickerValidator } from '@shared/validation/date-picker.validation';


@Component({
  selector: 'app-add-or-edit-document',
  templateUrl: './add-or-edit-document.component.html',
  styleUrls: ['./add-or-edit-document.component.scss']
})
export class AddOrEditDocumentComponent extends BaseComponent implements OnInit {

  dialogId: any = null;
  documentName: any = '';
  visibleBtnUpload: boolean = true;
  recordUrl: any = '';



  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<AddOrEditDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private achievementService: AchievementService,
  ) {
    super(injector);
    // this.dialogId = dialogData?.id;
    // if (this.dialogId) {
    //   this.getDetails(this.dialogId);
    // }
  }

  formGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(100)]],
    code: [null, [Validators.required, Validators.maxLength(50)]],
    status: [null, Validators.required],
    typeDoc: [null, Validators.required],
    signDate: [null,datePickerValidator()],
    effDate: [null,datePickerValidator()],
    expDate: [null,datePickerValidator()],
    recordUrl: [''],
    file: [],
    // description: [null],
    // parentId: [null],
  });

  ngOnInit(): void {
  }

  convertBase64(recordUrl): void {
    if (recordUrl) {
      this.achievementService.downloadFile(recordUrl).subscribe((res1) => {
        this.documentName = this._sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(res1.body)
        );
      });
    }
  }

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
  removeFile() {
    this.formGroup.controls['recordUrl'].setValue(null);
    this.recordUrl = null;
    this.documentName = null;
    this.visibleBtnUpload = !this.visibleBtnUpload;
  }

  downloadDocument(recordUrl: any) {
    this.achievementService
      .renderFile({ filePath: recordUrl, fileType: 2 })
      .subscribe((res) => {
        const res1 = this.getResponseFromHeader(res.headers);

        if (this.isSuccess(res1)) {
          const fileName = this.getFileName(res.headers);
          FileSaver.saveAs(res.body, fileName || this.documentName);
        } else {
          this.showSnackBar(res1.message, 'error');
        }
      });
  }
}
