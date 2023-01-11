/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {CommonUtilsService} from '@shared/common-utils.service';
import {Validators} from '@angular/forms';
import { AddOrEditDocumentComponent } from './add-or-edit-document/add-or-edit-document.component';
import { HrDocumentService } from '@shared/services/hr-document.service';

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.component.html',
  styleUrls: ['./document-management.component.scss']
})
export class DocumentManagementComponent extends BaseComponent implements OnInit {
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
    {
      columnDef: 'documentType',
      header: 'hrm-management.document.form.doc_type',
    },
    {
      columnDef: 'approveDate',
      header: 'hrm-management.document.form.sub_date',
      flex: 0.5,
    },
    {
      columnDef: 'effDate',
      header: 'hrm-management.document.form.effective_date',
    },
    {
      columnDef: 'expDate',
      header: 'hrm-management.document.form.expiration_date',
      flex: 0.5,
    },
    {
      columnDef: 'documentPath',
      header: 'hrm-management.staff.detail.contract.link',
      flex: 0.5,
    },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: ['view', 'edit'],
      flex: 1.3,
    },
  ];

  paginate = {
    page: 0,
    size: 10,
    total: 0,
  };


  formSearch = this.fb.group({
    keyword: ['',Validators.maxLength(100)],
  });

  constructor(injector: Injector , public documentService: HrDocumentService) {
    super(injector,documentService);
    // this.list_status = JSON.parse(localStorage.getItem('listType')).LIST_STATUS;
  }


  ngOnInit(): void {
    this.searchModel.status = 1;
    this.doSearch();
  }

  filterStatus(data){
    if(data){
      this.searchModel.status = Number(data);
    }else{
    this.searchModel.status = '';
    }
    this.doSearch();
  }

  mapData(data: any) {
    data.map((x) => {
      // x.type = this.getTypeContract(x.type);
      x.effDate = CommonUtilsService.dateToString(x.effDate, false);
      // x.salary = x.salary.toLocaleString() + ' đ';
      return x;
    });

    return data;
  }


  doSearch() {
    this.searchModel = {...this.searchModel,page: 0, ...this.formSearch.value};
    console.log(this.searchModel);

    this.processSearch(this.searchModel);
  }

  actionClick(e: any): void {
    switch (e.type) {
      case 'delete':
        this.deleteConfirmDialog(e.data.id);
        break;
      case 'edit':
        this.addOrEdit(e.data.id);
        break;
      case 'add':
        this.addOrEdit();
        break;
      // case 'view':
      //   this.showDetail(e.data.id);
    }
  }

  addOrEditDocument(id?: any): void {
    const ref = this.showDialog(AddOrEditDocumentComponent, {
      data: {
        id,
      },
      width: '60vw',
      // height: '45vh',
      disableClose: false
    }, (value) => {
      if (value) {
        this.doSearch();
      }
    });
    // ref.onclose()
  }
}
