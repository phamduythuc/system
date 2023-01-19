import { CommonUtilsService } from './../../../../../shared/common-utils.service';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../core/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { ContractService } from '@shared/services/contract.service';
import { datePickerValidator } from '@shared/validation/date-picker.validation';
import { StaffService } from '@shared/services/staff.service';
import { debounceTime, map } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-or-edit-contract',
  templateUrl: './add-or-edit-contract.component.html',
  styleUrls: ['./add-or-edit-contract.component.scss'],
})
export class AddOrEditContractComponent
  extends BaseComponent
  implements OnInit
{
  formGroup = this.fb.group({
    staffId: [null, Validators.required],
    type: [null, Validators.required],
    status: [null, Validators.required],
    code: [null, Validators.required],
    termPeriod: [null, Validators.required],
    effDate: [null, datePickerValidator()],
    expDate: [null, datePickerValidator()],
    signDate: [null, datePickerValidator()],
    salary: [null, Validators.required],
    insurance: [null, Validators.required],
    contractFilePath: [null],
    searchStaff: [null],
  });

  dialogId: any = null;

  listStaff: any = [];
  listCaregories: any = [];

  fileURL: any;

  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<AddOrEditContractComponent>,
    private ContractService: ContractService,
    private staffService: StaffService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _adapter: DateAdapter<any>
  ) {
    super(injector, ContractService, dialogRef);
    console.log(dialogData);

    this.dialogId = dialogData?.id;

    this.listStaff = dialogData.listUser;

    this.listCaregories = dialogData.listCaregories;

    // listCaregories.CONTACT_TYPE
    // listCaregories.CONTRACT_STATUS

    if (this.dialogId) {
      this.getDetails(this.dialogId, () => {
        this.fileUpload.name = this.detailsData.documentName;
        if (this.detailsData.contractFilePath) {
          this.detailsData.contractFilePath =
            this.detailsData.contractFilePath.split('contract/')[1];
        }
      });
    }else{
      this.fileUpload.name = null
    }

    this.listStaff = this.listStaff.map((x) => {
      x.status = true;
      return x;
    });

    this.formGroup
      .get('searchStaff')
      .valueChanges.pipe(
        map((event) => event),
        distinctUntilChanged()
      )
      .subscribe((res) => {
        this.listStaff.map((x) => {
          if (x.fullName.trim().toLowerCase().includes(res.toLowerCase())) {
            x.status = true;
          } else {
            x.status = false;
          }
          return x;
        });
      });
  }

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe((activeLang) => {
      this._adapter.setLocale(activeLang);
    });
    this.formGroup.valueChanges.subscribe((form) => {
      if (form.salary) {
        this.formGroup.patchValue(
          {
            salary: CommonUtilsService.formatCurrency(form.salary),
          },
          { emitEvent: false }
        );
      }
      if (form.insurance) {
        this.formGroup.patchValue(
          {
            insurance: CommonUtilsService.formatCurrency(form.insurance),
          },
          { emitEvent: false }
        );
      }
    });
  }

  save() {
    const formData = new FormData();
    const data = this.formGroup.value;
    if (data.insurance) {
      data.insurance = data.insurance.replace(/,/g, '');
    } else {
      data.insurance = data.insurance;
    }
    data.salary = data.salary.replace(/,/g, '');
    this.handleCoverTimeToString(data);
    if (this.dialogId) {
      data.id = this.dialogId;
      formData.append('file', this.fileUpload.file || null);
      formData.append(
        'data',
        new Blob([JSON.stringify(data)], { type: 'application/json' })
      );
      this.ContractService.updateContract(formData).subscribe((res) => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.close();
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    } else {
      formData.append('file', this.fileUpload.file);
      formData.append(
        'data',
        new Blob([JSON.stringify(data)], { type: 'application/json' })
      );
      this.ContractService.createContract(formData).subscribe((res) => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.close();
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    }
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
      this.formGroup.value.file = file;
      this.fileUpload.file = file;
      this.fileUpload.name = file.name;

      if (file.type === 'application/pdf') {
        this.fileUpload.type = 'assets/icons/icon_pdf.png';
      } else {
        this.fileUpload.type = 'assets/icons/icon_docx.png';
      }


      reader.onload = () => {
        this.fileURL = reader.result;
      };
    }
  }

  close() {
    // this.drawer?.toggle();
    this.dialogRef.close(this.formGroup.value);
  }
  formatSalary(e) {
    console.log(e);
  }
}
