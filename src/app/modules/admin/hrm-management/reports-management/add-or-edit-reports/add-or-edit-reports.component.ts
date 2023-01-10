import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { ReportsService } from '@shared/services/reports.service';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { AchievementService } from '@shared/services/achievement.service';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-add-or-edit-reports',
  templateUrl: './add-or-edit-reports.component.html',
  styleUrls: ['./add-or-edit-reports.component.scss'],
})
export class AddOrEditReportsComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSDA';

  columns: IColumn[] = [
    // {
    //   columnDef: 'stt',
    //   header: 'common.stt',
    //   flex: 0.3,
    // },
    {
      columnDef: 'name',
      header: 'common.name',
    },
    {
      columnDef: 'startRow',
      header: 'Start row',
    },
   
    {
      columnDef: 'startCol',
      header: 'Start column',
    },
    {
      columnDef: 'sql',
      header: 'Sql',
    },
    {
      columnDef: 'actionCustom',
      header: 'common.actions',
      actions: ['delete'],
    },
  ];

  // get displayedColumns(): any {
  //   return this.columns.map((c) => c.columnDef);
  // }

  // formGroup = this.fb.group({
  //   name: [null, Validators.required],
  //   code: [null, Validators.required],
  //   description: [null],
  // });

  dialogId: any = null;

  readonly = false;

  isLoading: boolean = false;

  fileURL: any;

  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<AddOrEditReportsComponent>,
    private ReportsService: ReportsService,
    private achievementService: AchievementService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    super(injector, ReportsService, dialogRef);

    this.dialogId = dialogData?.id;

    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
      description: [null],
      contractFilePath: [''],
      contractFilePathDemo: [''],
      sheetData: this.fb.array([]),
    });

    if (this.dialogId) {
      // this.getDetails(this.dialogId, () => {
      let data = {
        id: 1,
        name: 'Tên báo cáo 20',
        code: 'QĐ_07',
        description: 'Mô tả báo cáo 144 ',
        contractFilePath: 'contract/a7dc6743-e3b0-4174-bdd0-576d87834150.docx',
        contractFilePathDemo:
          'contract/a7dc6743-e3b0-4174-bdd0-576d87834150.docx',
        documentName: 'LU. Đánh giá sau ĐT.docx',
        sheetData: [
          {
       
              name: 'Doanh thu thang 1',
              sql: 'Select * from doanhthu',
              startRow: 2,
              startCol: 5,
          },
          {
              name: 'Doanh thu thang 2',
              sql: 'Select * from doanhthu',
              startRow: 1,
              startCol: 8,
          },
        ],
      };

      this.detailsData = data;

      this.detailsData.sheetData.map((x) => {
        this.efforts.push(this.newItem(x));
      });
      console.log(this.detailsData);

      this.formGroup.patchValue(this.detailsData);

      // });
    }
  }

  ngOnInit(): void {
    console.log(this.efforts.value);
  }

  save() {
    console.log(this.formGroup.value);
    
  }

  get efforts(): FormArray {
    return this.formGroup.get('sheetData') as FormArray;
  }

  newItem(data: any): FormGroup {
    return this.fb.group({
      name: [data.name],
      sql: [data.sql],
      startRow: [data.startRow],
      startCol: [data.startCol],
    });
  }

  addNewRow() {
    this.isLoading = true;
    this.efforts.push(this.newItem({}));
    setTimeout(() => {
      this.isLoading = false;
    }, 1);
  }

  deleteRow(index: number) {
    // delete this.listStaff[index];
    // delete this.filteredList[index];
    this.isLoading = true;
    this.efforts.removeAt(index);
    setTimeout(() => {
      this.isLoading = false;
    }, 1);
  }

  download(data: any) {
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

  uploadFile(event: any): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.formGroup.value.file = file;
      this.detailsData.documentName = file.name;

      reader.onload = () => {
        this.fileURL = reader.result;
      };
    }
  }

  close() {
    // this.drawer?.toggle();
    this.dialogRef.close(this.formGroup.value);
  }
}
