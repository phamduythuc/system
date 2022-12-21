import { data } from 'autoprefixer';
import { HandlerViewRoleComponent } from './handler-view-role/handler-view-role.component';

import { RoleManagementService } from './../../../../shared/services/role-management.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { HandlerEditRoleComponent } from './handler-edit-role/handler-edit-role.component';
import { HandlerAddRoleComponent } from './handler-add-role/handler-add-role.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { HandlerDeleteRoleComponent } from './handler-delete-role/handler-delete-role.component';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSNV';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'name',
      header: 'common.fullName',
      flex: 0.5,
    },
    {
      columnDef: 'description',
      header: 'common.description',
      flex: 0.7,
    },
    {
      columnDef: 'status',
      header: 'common.status',
      flex: 0.7,
    },
    {
      columnDef: 'createdDate',
      header: 'common.createdDate',
      flex: 0.5,
      cellRenderer: (element: any) =>
        CommonUtilsService.dateToString(element.createdDate),
    },
    {
      columnDef: 'modifiedDate',
      header: 'common.modifiedDate',
      flex: 0.5,
      cellRenderer: (element: any) =>
        CommonUtilsService.dateToString(element.modifiedDate),
    },
    {
      columnDef: 'createdBy',
      header: 'common.createdBy',
      flex: 0.5,
    },
    {
      columnDef: 'modifiedBy',
      header: 'common.modifiedBy',
      flex: 0.7,
    },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: ['view', 'edit', 'delete'],
      flex: 0.7,
    },
  ];
  formSearch = this.fb.group({
    keyword: [''],
  });

  constructor(injector: Injector, public roleService: RoleManagementService) {
    super(injector, roleService);
  }

  ngOnInit(): void {
    console.log(this.searchResult);
    
    this.doSearch();
    this.roleService.getListAllRole().subscribe((role) => {});
  }

  doSearch() {
    this.searchModel = {
      ...this.searchModel,
      page: 0,
      ...this.formSearch.value,
    };
    this.processSearch(this.searchModel);
  }

  actionClick(e: any): void {
    if (e.type === 'edit') {
      this.editHandlerclick(e.data);
    }
    if (e.type === 'delete') {
      this.deleteHandlerclick(e.data.id);
    }
    if (e.type === 'view') {
      this.viewHandlerclick(e.data);
    }
  }

  viewHandlerclick(data): void {
    this.showDialog(HandlerViewRoleComponent, {
      data: {
        data: data,
      },
      width: '60vw',
      height: 'auto',
      disableClose: false,
    });
  }

  editHandlerclick(data) {
    this.showDialog(HandlerEditRoleComponent, {
      data: {
        data: data,
      },
      width: '60vw',
      height: 'auto',
      disableClose: false,
    });
  }
  deleteHandlerclick(id: any) {
    this.showDialog(HandlerDeleteRoleComponent, {}, (value) => {
      if (value) {
        this.roleService.deleteRole(id).subscribe();
      }
    });
  }
  addHandlerclick() {
    this.showDialog(HandlerAddRoleComponent, {
      width: '60vw',
      height: 'auto',
      disableClose: false,
    });
  }
}
