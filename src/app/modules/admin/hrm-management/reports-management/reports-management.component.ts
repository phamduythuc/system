import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from '@core/base.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { ReportsService } from '@shared/services/reports.service';
import { AddOrEditReportsComponent } from './add-or-edit-reports/add-or-edit-reports.component';
import { DetailReportsComponent } from './detail-reports/detail-reports.component';

@Component({
  selector: 'app-reports-management',
  templateUrl: './reports-management.component.html',
  styleUrls: ['./reports-management.component.scss'],
})
export class ReportsManagementComponent
  extends BaseComponent
  implements OnInit
{
  _permissionCodeName = 'DSTV';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'name',
      header: 'hrm-management.reports.form.name',
    },
    {
      columnDef: 'code',
      header: 'hrm-management.reports.form.code',
    },
    {
      columnDef: 'description',
      header: 'hrm-management.reports.form.description',
    },
    {
      columnDef: 'createdDate',
      header: 'common.createdDate',
      cellRenderer: (element: any) =>
        CommonUtilsService.dateToString(element.createdDate),
    },
    {
      columnDef: 'modifiedDate',
      header: 'common.modifiedDate',
      cellRenderer: (element: any) =>
        CommonUtilsService.dateToString(element.modifiedDate),
    },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: ['view', 'edit', 'delete'],
    },
  ];

  formSearch = this.fb.group({
    keyword: ['', Validators.maxLength(100)],
  });

  paginate = {
    page: 0,
    size: 10,
    total: 0,
  };
  positions = [];
  panelOpenState: boolean = false;

  list_status = [];

  typeStatus = '1';

  constructor(injector: Injector, public ReportsService: ReportsService) {
    super(injector, ReportsService);

    this.list_status = JSON.parse(localStorage.getItem('listType')).LIST_STATUS;
  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    this.doSearch();
  }

  filterStatus(data) {
    if (data) {
      this.searchModel.status = Number(data);
    } else {
      this.searchModel.status = '';
    }
    this.doSearch();
  }

  doSearch() {
    this.searchModel = {
      ...this.searchModel,
      page: 0,
      ...this.formSearch.value,
    };
    console.log(this.searchModel);
    
    this.processSearch(this.searchModel,()=>{
      // let ar = this.searchResult.data
      
      // this.searchResult.data = ar.data

      // this.searchResult.totalRecords = this.searchResult.data.length;
      // this.pageIndex = 1;
    });
    
    // this.searchResult.data = [
    //   {
    //     id: 1,
    //     name: 'Tên báo cáo 1',
    //     code: 'QĐ_01',
    //     description: 'Mô tả báo cáo 1',
    //     createdDate: '1673000041000',
    //     modifiedDate: '1673002041000',
    //   },
    //   {
    //     id: 1,
    //     name: 'Tên báo cáo 5',
    //     code: 'QĐ_02',
    //     description: 'Mô tả báo cáo 1 222',
    //     createdDate: '1673000041000',
    //     modifiedDate: '1673002041000',
    //   },
    //   {
    //     id: 1,
    //     name: 'Tên báo cáo 6',
    //     code: 'QĐ_04',
    //     description: 'Mô tả báo cáo 13 33',
    //     createdDate: '1673000041000',
    //     modifiedDate: '1673002041000',
    //   },
    //   {
    //     id: 1,
    //     name: 'Tên báo cáo 20',
    //     code: 'QĐ_07',
    //     description: 'Mô tả báo cáo 144 ',
    //     createdDate: '1673000041000',
    //     modifiedDate: '1673002041000',
    //   },
    // ];

   
  }

  actionClick(e: any): void {
    if (e.type === 'view') {
      this.showDetail(e.data.id);
    }
    if (e.type === 'edit') {
      this.addOrEditPosition(e.data.id);
    }
    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id);
    }
  }

  showDetail(id) {
    this.showDialog(DetailReportsComponent, {
      data: {
        id,
      },
      width: '60vw',
      // height: '45vh',
      disableClose: false,
      maxHeight: '90vh'
    });
  }

  addOrEditPosition(id?: any): void {
    const ref = this.showDialog(
      AddOrEditReportsComponent,
      {
        data: {
          id,
        },
        width: '60vw',
        // height: '45vh',
        disableClose: false,
        maxHeight: '90vh'
      },
      (value) => {
        if (value) {
          this.doSearch();
        }
      }
    );
    // ref.onclose()
  }
}
