/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {CommonUtilsService} from '@shared/common-utils.service';
import {Validators} from '@angular/forms';
import { AddOrEditDocumentComponent } from './add-or-edit-document/add-or-edit-document.component';

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.component.html',
  styleUrls: ['./document-management.component.scss']
})
export class DocumentManagementComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSPB';
  list_status = [];


  constructor(injector: Injector) {
    super(injector);
    this.list_status = JSON.parse(localStorage.getItem('listType')).LIST_STATUS;
  }

  formSearch = this.fb.group({
    keyword: ['',Validators.maxLength(100)],
  });

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

  doSearch() {
    this.searchModel = {...this.searchModel,page: 0, ...this.formSearch.value};
    this.processSearch(this.searchModel);
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
