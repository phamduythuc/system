import { Component, Inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../core/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { ContractService } from '@shared/services/contract.service';
import { datePickerValidator } from '@shared/validation/date-picker.validation';


@Component({
  selector: 'app-add-or-edit-contract',
  templateUrl: './add-or-edit-contract.component.html',
  styleUrls: ['./add-or-edit-contract.component.scss']
})
export class AddOrEditContractComponent extends BaseComponent implements OnInit {
  formGroup = this.fb.group({
    staffId: [null, Validators.required],
    type: [null, Validators.required],
    status: [null, Validators.required],
    code: [null, Validators.required],
    termPeriod: [null, Validators.required],
    effDate: [null,datePickerValidator()],
    expDate: [null,datePickerValidator()],
    signDate: [null,datePickerValidator()],
    salary: [null, Validators.required],
    insurance: [null, Validators.required],
    contractFilePath: [null],

  });

  dialogId: any = null;

  listUser: any = [];
  listCaregories: any = [];

  fileURL:any

  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<AddOrEditContractComponent>,
    private ContractService:ContractService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    super(injector, ContractService, dialogRef);
    this.dialogId = dialogData?.id;
    
    this.listUser = dialogData.listUser;
    this.listCaregories = dialogData.listCaregories;
    // listCaregories.CONTACT_TYPE
    // listCaregories.CONTRACT_STATUS

    if (this.dialogId) {
      let arr = {
        id: 2,
        staffId: 302,
        code: 'CT2',
        type: 2,
        status: 1,
        effDate: '2022-01-01T00:00:00Z',
        expDate: '2023-01-01T00:00:00Z',
        signDate: '2022-01-01T00:00:00Z',
        salary: 100000000,
        insurance: 500000.0,
        termPeriod: 2,
        contractFilePath: 'contract/0e391dea-a695-40bc-bc52-d619ea580882.docx',
        createdDate: '2022-12-22T02:33:43Z',
        modifiedDate: '2022-12-22T02:33:43Z',
        createdBy: 'admin',
        modifiedBy: null,
      }
      this.formGroup.patchValue(arr);

      // this.getDetails(12, () => {
      // });
    }
  }

  ngOnInit(): void {
    
  }

  save(data) {
    const formData = new FormData();
    const dataForm = this.formGroup.value;
    
    this.handleCoverTimeToString(data);
    data.id = this.dialogId || null;

    dataForm.append('file', this.formGroup.get('file').value || null);
    dataForm.append('data', new Blob([JSON.stringify(data)], {type: 'application/pdf'}));

    // this.addOrEdit(data);
    console.log(data);
    
    // this.dialogRef.close(data)
  }
  uploadFile(event: any): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.formGroup.value.file = file;
      console.log(this.formGroup.value);
      reader.onload = () => {
        this.fileURL = reader.result;
      };
    }
  }
}
