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
  styleUrls: ['./detail-reports.component.scss']
})
export class DetailReportsComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSDA';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'name',
      header: 'common.name',
      flex: 0.4,
    },
    {
      columnDef: 'sql',
      header: 'Sql',
    },
    {
      columnDef: 'startRow',
      header: 'Start row',
      flex: 0.3,
    },
    {
      columnDef: 'startCol',
      header: 'Start column',
      flex: 0.3,
    },
    // {
    //   columnDef: 'actionCustom',
    //   header: 'common.actions',
    //   actions: ['delete'],
    //   flex: 0.3,
    // },
  ];

  sheetData = [
    {
      id: 1,
      name: 'Tên báo cáo 20',
      code: 'QĐ_07',
      description: 'Mô tả báo cáo 144 ',
      createdDate: '1673000041000',
      modifiedDate: '1673002041000',
      contractFilePath: 'contract/a7dc6743-e3b0-4174-bdd0-576d87834150.docx',
      contractFilePathDemo:
        'contract/a7dc6743-e3b0-4174-bdd0-576d87834150.docx',
      documentName: 'LU. Đánh giá sau ĐT.docx',
    },
    {
      id: 2,
      name: 'Tên báo cáo 20',
      code: 'QĐ_07',
      description: 'Mô tả báo cáo 144 ',
      createdDate: '1673000041000',
      modifiedDate: '1673002041000',
      contractFilePath: 'contract/a7dc6743-e3b0-4174-bdd0-576d87834150.docx',
      contractFilePathDemo:
        'contract/a7dc6743-e3b0-4174-bdd0-576d87834150.docx',
      documentName: 'LU. Đánh giá sau ĐT.docx',
    },
  ];

  // formGroup = this.fb.group({
  //   name: [null, Validators.required],
  //   code: [null, Validators.required],
  //   description: [null],
  // });

  dialogId: any = null;

  readonly = true;

  isLoading: boolean = false;

  fileURL:any

  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<DetailReportsComponent>,
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
      contractFilePathDemo:[''],
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
        ],
      };
      this.detailsData = data

      this.detailsData.sheetData.map(x=>{
        this.efforts.push(this.newItem(x));
      })

      this.formGroup.patchValue(data);

      // });
    }
  }

  ngOnInit(): void {
    
  }

  save() {
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

  loadDataDeail(data){
    
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

  close() {
    // this.drawer?.toggle();
    this.dialogRef.close(this.formGroup.value);
  }
}
