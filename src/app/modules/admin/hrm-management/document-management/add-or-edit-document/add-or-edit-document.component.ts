import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

import { BaseComponent } from '@core/base.component';
import { AchievementService } from '@shared/services/achievement.service';
import FileSaver from 'file-saver';
import { datePickerValidator } from '@shared/validation/date-picker.validation';
import { HrDocumentService } from '@shared/services/hr-document.service';
import { CategoriesService } from '@core/categories.service';
import { CommonUtilsService } from '@shared/common-utils.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-or-edit-document',
  templateUrl: './add-or-edit-document.component.html',
  styleUrls: ['./add-or-edit-document.component.scss'],
})
export class AddOrEditDocumentComponent
  extends BaseComponent
  implements OnInit
{
  dialogId: any = null;
  documentName: any = '';
  visibleBtnUpload: boolean = true;
  documentPath: any = '';
  listDocType: any = [];
  listDocStatus: any = [];
  docDetailData: any;

  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<AddOrEditDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private documentService: HrDocumentService,
    private achievementService: AchievementService,
    private categories: CategoriesService
  ) {
    super(injector, documentService, dialogRef);
    this.dialogId = dialogData?.id;
    if (this.dialogId) {
      this.getDetails(this.dialogId);
    }
    // this.getDocTypes();
    // this.getDocStatus();
    this.getTypeAndStatus();
  }

  formGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(100)]],
    code: [null, [Validators.required, Validators.maxLength(50)]],
    status: [null, Validators.required],
    documentType: [null, Validators.required],
    approveDate: [null, datePickerValidator()],
    effDate: [null, datePickerValidator()],
    expDate: [null, datePickerValidator()],
    documentName: [''],
    documentPath: [''],
    file: [],
  });

  ngOnInit(): void {}

  onChange(data){
    this.listDocType.map((x: any)=>{
      if(x.name === data.value){
        this.formGroup.controls.documentType.setValue(Number(x.code));
      }
      return x;
    });
  }

  getDetails(id): any {
    this.documentService.getOne(id).subscribe(
      (res) => {

        if (res.code === '00') {
          this.docDetailData = res.data;
          if (this.docDetailData) {
            const urlName = res.data.documentName;
            this.documentName = urlName;
            const urlFilePath = res.data.documentPath;
            this.documentPath = urlFilePath;

            if (this.documentName !== '') {
              this.visibleBtnUpload = !this.visibleBtnUpload;
            }
            this.formGroup.patchValue({
              name: res.data.name,
              code: res.data.code,
              status: res.data.status,
              documentType: res.data.documentType,
              approveDate: res.data.approveDate,
              effDate: res.data.effDate,
              expDate: res.data.expDate,

            });
            // console.log(this.listDocType);

            // this.listDocType.map((x: any) => {
            //   if (Number(x.code) === this.docDetailData.documentType) {
            //     this.docDetailData.documentType = x.name;
            //   }
            //   return x;
            // });

            // this.listDocStatus.map((x: any) => {
            //   if (Number(x.code) === this.docDetailData.status) {
            //     this.docDetailData.status = x.name;
            //   }
            //   return x;
            // });
          }
        } else {
          this.documentName = '';
          this.formGroup.patchValue({
            name: null,
            code: null,
            status: null,
            documentType: null,
            approveDate: null,
            effDate: null,
            expDate: null,
            documentName: null,
          });
        }
      });
  }

  save() {
    const formData = new FormData();
    const data = this.formGroup.value;
    this.handleCoverTimeToString(data);
    data.approveDate =
      data.approveDate && CommonUtilsService.dateToString(data.approveDate);

    data.id = this.dialogData.id;

    formData.append('file', this.formGroup.get('file').value || null);
    formData.append(
      'data',
      new Blob([JSON.stringify(data)], { type: 'application/json' })
    );
    if (this.dialogId) {
      this.documentService.updateDocument(formData).subscribe((res) => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.close();
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    } else {
      this.documentService.createDocument(formData).subscribe((res) => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.close();
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    }
  }

  convertBase64(documentPath): void {
    if (documentPath) {
      this.achievementService.downloadFile(documentPath).subscribe((res1) => {
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
        // this.documentPath = reader.result;
        this.documentName = file.name;
        this.visibleBtnUpload = !this.visibleBtnUpload;
      };
    }
  }
  removeFile() {
    this.formGroup.controls['documentPath'].setValue(null);
    this.documentPath = null;
    this.documentName = null;
    this.visibleBtnUpload = !this.visibleBtnUpload;
  }

  downloadDocument(documentPath: any) {
    this.achievementService
      .renderFile({ filePath: documentPath, fileType: 2 })
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

  close() {
    // this.drawer?.toggle();
    this.dialogRef.close(this.formGroup.value);
  }

//   getDocTypes() {
//     this.categories
//       .getCategories('HR_DOCUMENT_TYPE')
//       .subscribe((res) => {
//         this.listDocType = res.data;
//       //   this.listDocType.map((x: any)=>{
//       //     if (Number(x.code) === this.formGroup.value.documentType) {
//       //       this.formGroup.controls['documentType'].setValue(x.code);
//       //         }
//       // });
//   });
// }
//   getDocStatus() {
//     this.categories.getCategories('HR_DOCUMENT_STATUS').subscribe((res) => {
//       this.listDocStatus = res.data;
//     //   this.listDocStatus.map((x: any)=>{
//     //     if (Number(x.code) === this.formGroup.value.status) {
//     //       this.formGroup.controls['status'].setValue(x.code);
//     //         }
//     // });
//     });
//   }
getTypeAndStatus(){

  forkJoin([this.categories.getCategories('HR_DOCUMENT_TYPE'), this.categories.getCategories('HR_DOCUMENT_STATUS'),
]).subscribe(([docT, docSta]) => {
  this.listDocType = docT.data;
  this.listDocType.map((x: any)=>{
        if (Number(x.code) === this.formGroup.value.documentType) {
          this.formGroup.controls['documentType'].setValue(x.code);
            }
    });
    this.listDocStatus = docSta.data;
    this.listDocStatus.map((x: any)=>{
      if (Number(x.code) === this.formGroup.value.status) {
        this.formGroup.controls['status'].setValue(x.code);
          }
  });
});
}
}
