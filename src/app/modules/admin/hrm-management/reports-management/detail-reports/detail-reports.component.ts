import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { AchievementService } from '@shared/services/achievement.service';
import { ReportsService } from '@shared/services/reports.service';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-detail-reports',
  templateUrl: './detail-reports.component.html',
  styleUrls: ['./detail-reports.component.scss'],
})
export class DetailReportsComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSDA';

  columns: IColumn[] = [
    {
      columnDef: 'name',
      header: 'common.name',
    },
    {
      columnDef: 'startRow',
      header: 'hrm-management.reports.form.startRow',
    },
    {
      columnDef: 'startColumn',
      header: 'hrm-management.reports.form.startCol',
    },
    {
      columnDef: 'scriptSql',
      header: 'hrm-management.reports.form.sql',
    },
    {
      columnDef: 'comment',
      header: 'hrm-management.reports.form.comment',
    },
    {
      columnDef: 'actionCustom',
      header: 'common.actions',
      actions: ['delete'],
    },
  ];

  dialogId: any = null;

  readonly = true;

  isLoading: boolean = false;

  fileURL: any;

  listSheet: any = {
    data: [],
    validate: false,
  };

  fileUpload: any;

  random: any;

  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<DetailReportsComponent>,
    public ReportsService: ReportsService,
    private achievementService: AchievementService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    super(injector, ReportsService, dialogRef);

    this.dialogId = dialogData?.id;

    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
      description: [null],
      templatePath: [''],
      templateName: [''],
      listSheet: this.fb.array([]),
    });
    if (this.dialogId) {
      this.getDetails(this.dialogId, () => {
        this.formGroup.patchValue(this.detailsData);
      });
    } else {
      this.detailsData = this.formGroup.value;
    }
  }

  ngOnInit(): void {}

  save() {
    // console.log(this.formGroup.value);
    this.formGroup.value.listSheet = this.listSheet.data;

    const formData = new FormData();
    const data = this.formGroup.value;

    if (this.dialogId && this.dialogId !== -1) {
      data.id = this.dialogId;
      formData.append('file', this.fileUpload || null);
      formData.append(
        'data',
        new Blob([JSON.stringify(data)], { type: 'application/json' })
      );
      this.ReportsService.updateReports(formData).subscribe((res) => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.close();
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    } else {
      formData.append('file', this.fileUpload || null);
      formData.append(
        'data',
        new Blob([JSON.stringify(data)], { type: 'application/json' })
      );
      this.ReportsService.createReports(formData).subscribe((res) => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.close();
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    }
  }

  // get efforts(): FormArray {
  //   return this.formGroup.get('listSheet') as FormArray;
  // }

  newItem(data: any) {
    return {
      name: null,
      scriptSql: null,
      startRow: null,
      startColumn: null,
      comment: null,
      listParam: [],
      sheetOrder: null,
    };
  }

  addNewRow() {
    this.isLoading = true;
    this.detailsData.listSheet.push(this.newItem({}));
    setTimeout(() => {
      this.isLoading = false;
    }, 1);

    this.random = (Math.random() + 1).toString(36).substring(7);
  }

  deleteRow(index: number) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1);
  }

  download(data: any, type: any) {
    console.log(data);
    
    if (type == 1) {
      this.achievementService
        .renderFile({
          filePath: data,
          fileType: 2,
        })
        .subscribe((res) => {
          const res1 = this.getResponseFromHeader(res.headers);
          if (this.isSuccess(res1)) {
            const fileName = this.getFileName(res.headers);
            FileSaver.saveAs(res.body, fileName);
          } else {
            this.showSnackBar(res1.message, 'error');
          }
        });
    }

    if (type == 2) {
      this.ReportsService.downloadReports(data).subscribe((res:any) => {
        console.log(res);
        
        // const res1 = this.getResponseFromHeader(res.headers);
        // if (this.isSuccess(res1)) {
        //   const fileName = this.getFileName(res.headers);
        //   FileSaver.saveAs(res.body, fileName);
        // } else {
        //   this.showSnackBar(res1.message, 'error');
        // }
      });
    }
  }

  uploadFile(event: any): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.fileUpload = file;
      this.detailsData.templateName = file.name;

      reader.onload = () => {
        this.fileURL = reader.result;
      };
    }
  }

  close() {
    // this.drawer?.toggle();
    this.dialogRef.close(this.formGroup.value);
  }

  handleDataListParam(data) {
    if (data.type === 'delete') {
      let arr = [...this.detailsData.listSheet];
      arr.splice(data.data, 1);
      this.detailsData.listSheet = arr;
    }
    this.listSheet = data;
  }
}
