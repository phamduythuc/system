import { data } from 'autoprefixer';
import { HandlerViewRoleComponent } from './handler-view-role/handler-view-role.component';

import { RoleManagementService } from './../../../../shared/services/role-management.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { StaffService } from '@shared/services/staff.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent extends BaseComponent implements OnInit {
  _permissionCodeName= 'DSNV';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'fullName',
      header: 'common.fullName',
      flex: 0.7,
    },
    {
      columnDef: 'staffCode',
      header: 'common.staffCode',
      flex: 0.7 ,
    },
    {
      columnDef: 'departmentNames',
      header: 'common.department',
      flex: 0.7,
    },
    {
      columnDef: 'positionId',
      header: 'common.position',
      flex: 0.7,
    },
    {
      columnDef: 'phone',
      header: 'common.phone',
      flex: 0.5
    },
    {
      columnDef: 'companyEmail',
      header: 'common.companyEmail',
      flex: 0.5,
    },
  
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: [ 'view','edit', 'delete'],
      flex: 1.3,
    }
  ];
  formSearch = this.fb.group({
    keyword: [''],
  })

  constructor(injector: Injector, public staffService: StaffService, public roleService: RoleManagementService) {
    super(injector, staffService);
  }


  ngOnInit(): void {
    this.doSearch();
  }

  doSearch() {
    this.searchModel = {...this.searchModel,page:0 , ...this.formSearch.value}
    this.processSearch(this.searchModel)
  }

  actionClick(e: any): void {
    if (e.type === 'edit') {
      this.editHandlerclick(e.data.id);
    }
    if (e.type === 'delete') {
      
      this.deleteHandlerclick(e.data.id);
    }
    if (e.type === 'view') {
     this.viewHandlerclick(e.data);
    }
    // if(e.type === 'add') {
    //   this.addHandlerclick(e.data.id);
    // }
  }
  viewHandlerclick(data): void {
    this.showDialog(HandlerViewRoleComponent, {
      data: {
        data: data,
      },
      width: '60vw',
      height: '50vh',
      disableClose: false,
    }
    )
  }
  // addHandlerclick(e: any):void {
  //   this.showDialog(DetailsStaffLevelComponent, {
  //     data: {
        
  //     },
  //     width: '60vw',
  //     height: '50vh',
  //     disableClose: true
  //   }
  // );
  // }
  editHandlerclick(e: any) {}
  deleteHandlerclick(id?: any) {
    this.showDialog(ConfirmDialogComponent, {}, (value) => {
      if (value) {
        this.delete(id);
      }
    });
  }
}
