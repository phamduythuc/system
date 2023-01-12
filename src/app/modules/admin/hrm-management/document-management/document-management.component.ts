/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { Validators } from '@angular/forms';
import { AddOrEditDocumentComponent } from './add-or-edit-document/add-or-edit-document.component';
import { HrDocumentService } from '@shared/services/hr-document.service';
import { DetailDocumentComponent } from './detail-document/detail-document.component';
import { AchievementService } from '@shared/services/achievement.service';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.component.html',
  styleUrls: ['./document-management.component.scss'],
})
export class DocumentManagementComponent
  extends BaseComponent
  implements OnInit
{
  _permissionCodeName = 'DSPB';
  list_status = [];
  dataDocument = [];

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'code',
      header: 'hrm-management.document.form.code',
      flex: 0.7,
    },
    {
      columnDef: 'name',
      header: 'hrm-management.document.form.name',
    },
    // {
    //   columnDef: 'documentType',
    //   header: 'hrm-management.document.form.doc_type',
    // },
    {
      columnDef: 'approveDate',
      header: 'hrm-management.document.form.sub_date',
      flex: 0.5,
      // cellRenderer: (element: any) =>
      //   CommonUtilsService.dateToString(element.approveDate),
    },
    {
      columnDef: 'effDate',
      header: 'hrm-management.document.form.effective_date',
      // cellRenderer: (element: any) =>
      //   CommonUtilsService.dateToString(element.effDate),
    },
    {
      columnDef: 'expDate',
      header: 'hrm-management.document.form.expiration_date',
      flex: 0.5,
      // cellRenderer: (element: any) =>
      //   CommonUtilsService.dateToString(element.expDate),
    },
    {
      columnDef: 'documentPath',
      header: 'hrm-management.staff.detail.contract.link',
      flex: 0.5,
    },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: ['view', 'edit', 'delete'],
      flex: 1.3,
    },
  ];

  paginate = {
    page: 0,
    size: 10,
    total: 0,
  };

  formSearch = this.fb.group({
    keyword: ['', Validators.maxLength(100)],
  });

  constructor(
    injector: Injector,
    public documentService: HrDocumentService,
    public achievementService: AchievementService
  ) {
    super(injector, documentService);
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

  mapData(data: any) {
    data.map((x) => {
      // x.type = this.getTypeContract(x.type);
      x.effDate = CommonUtilsService.dateToString(x.effDate, true);
      // x.salary = x.salary.toLocaleString() + ' đ';
      return x;
    });

    return data;
  }

  doSearch() {
    this.searchModel = {
      ...this.searchModel,
      page: 0,
      ...this.formSearch.value,
    };
    this.processSearch(this.searchModel);
    this.searchResult.data = this.mapData(this.searchResult.data);
    // this.dataDocument = this.searchResult.data.map((item) => {
    //   return item.documentName;
    // });
  }

  actionClick(e: any): void {
    if (e.type === 'view') {
      this.showDetail(e.data.id);
      return;
    }
    if (e.type === 'edit') {
      this.addOrEditDocument(e.data.id);
      return;
    }
    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id);
      return;
    }
  }

  addOrEditDocument(id?: any): void {
    this.showDialog(
      AddOrEditDocumentComponent,
      {
        data: {
          id,
          projects: this.searchResult.data,
        },
        width: '60vw',
        // height: '45vh',
        disableClose: false,
      },
      (value) => {
        if (value) {
          this.doSearch();
        }
      }
    );
  }

  showDetail(id) {
    this.showDialog(DetailDocumentComponent, {
      data: {
        id,
      },
      width: '60vw',
      height: '85vh',
      disableClose: true,
    });
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
}
