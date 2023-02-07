import { HandlerViewRoleComponent } from './handler-view-role/handler-view-role.component';
import { RoleManagementService } from './../../../../shared/services/role-management.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { IColumn } from '@layout/common/data-table/data-table.component';

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
      header: 'hrm-management.role.roleName',
      flex: 0.3,
    },
    {
      columnDef: 'description',
      header: 'common.description',
    },
    {
      columnDef: 'createdDate',
      header: 'common.createdDate',
      cellRenderer: (element: any) =>
        CommonUtilsService.dateToString(element.createdDate),
    },
    {
      columnDef: 'createdBy',
      header: 'common.createdBy',
    },
    {
      columnDef: 'modifiedDate',
      header: 'common.modifiedDate',
      cellRenderer: (element: any) =>
        CommonUtilsService.dateToString(element.modifiedDate),
    },
    {
      columnDef: 'modifiedBy',
      header: 'common.modifiedBy',
    },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: ['view', 'edit', 'delete'],
    },
  ];
  formSearch = this.fb.group({
    keyword: [''],
  });

  list_status = []

  typeStatus = '1';

  constructor(injector: Injector, public roleService: RoleManagementService) {
    super(injector, roleService);
    this.list_status = JSON.parse(localStorage.getItem('listType')).LIST_STATUS;
  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    this.doSearch();
    this.roleService.getListAllRole().subscribe((role) => {});
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
    const dialog = this.showDialog(HandlerEditRoleComponent, {
      data: {
        data: data,
      },
      width: '60vw',
      height: 'auto',
      disableClose: false,
    },(value) => {
      this.roleService.getListAllRole().subscribe((res) => {
        if (res.code == '00') {
          this.doSearch();
        }
      });
    });
  }
  deleteHandlerclick(id: any) {
    this.showDialog(HandlerDeleteRoleComponent, {}, (value) => {
      if (value) {
        this.roleService.deleteRole(id).subscribe((res) => {
          if (res.code == '00') {
            this.showSnackBar(res.message, 'success');
            this.doSearch();
          } else {
            this.showSnackBar(res.message, 'error');
          }
        });
      }
    });
  }
  addHandlerclick() {
    this.showDialog(
      HandlerAddRoleComponent,
      {
        width: '60vw',
        height: 'auto',
        disableClose: false,
      },
      (value) => {
        this.roleService.getListAllRole().subscribe((res) => {
          if (res.code == '00') {
            this.doSearch();
          }
        });
      }
    );
  }
}
