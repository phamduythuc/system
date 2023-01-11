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


@Component({
  selector: 'app-add-or-edit-document',
  templateUrl: './add-or-edit-document.component.html',
  styleUrls: ['./add-or-edit-document.component.scss']
})
export class AddOrEditDocumentComponent extends BaseComponent implements OnInit {

  dialogId: any = null;
  documentName: any = '';
  visibleBtnUpload: boolean = true;
  documentPath: any = '';
  listDocType: any;
  listDocStatus: any;
  // file: any;


  // statusListCate: any = ['HR_DOCUMENT_TYPE','HR_DOCUMENT_STATUS'];


  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<AddOrEditDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private documentService: HrDocumentService,
    private achievementService: AchievementService,
    private categories: CategoriesService,
  ) {
    super(injector,documentService,dialogRef);
    this.dialogId = dialogData?.id;
    if (this.dialogId) {
      this.getDetails(this.dialogId);
    }
    this.getCategories();
  }

  formGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(100)]],
    code: [null, [Validators.required, Validators.maxLength(50)]],
    status: [null,Validators.required],
    documentType: [null,Validators.required],
    approveDate: [null,datePickerValidator()],
    effDate: [null,datePickerValidator()],
    expDate: [null,datePickerValidator()],
    documentName: [''],
    documentPath: [''],
    file: [],
    // description: [null],
    // parentId: [null],
  });

  ngOnInit(): void {
  }
    getDetails(id): any {
      this.documentService.getOne(id).subscribe(res=>{
        if(res.code==='00'){
           console.log(res.data);}
        });
  }

  save() {

    const formData = new FormData();
    const data = this.formGroup.value;
    this.handleCoverTimeToString(data);
    console.log(this.formGroup.get('file').value.name);

    data.approveDate=data.approveDate&&CommonUtilsService.dateToString(data.approveDate);

    formData.append('file', this.formGroup.get('file').value || null);
    formData.append('data', new Blob([JSON.stringify(data)], {type: 'application/json'}));
    if(this.dialogId){
      data.id = this.dialogId;

      // formData.append('file', this.documentPath.file || null);
      // this.documentService.updateContract(formData).subscribe(res => {
      //   if ('00' === res.code) {
      //     this.showSnackBar(res.message, 'success');
      //     this.close();
      //   } else {
      //     this.showSnackBar(res.message, 'error');
      //   }
      // });
    }else{
      this.documentService.createDocument(formData).subscribe(res => {
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

  getCategories() {
    this.categories.getCategories('HR_DOCUMENT_TYPE').subscribe(res => {
      this.listDocType = res.data;
    });
    this.categories.getCategories('HR_DOCUMENT_STATUS').subscribe(res => {
      this.listDocStatus = res.data;
    });
  }
}
