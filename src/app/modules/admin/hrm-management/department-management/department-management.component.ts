import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {DepartmentManagementService} from './department-management.service';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {AddOrEditDepartmentComponent} from './add-or-edit-department/add-or-edit-department.component';
import {ConfirmDialogComponent} from '@shared/components/confirm-dialog/confirm-dialog.component';
import {CommonUtilsService} from '@shared/common-utils.service';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.scss']
})
export class DepartmentManagementComponent extends BaseComponent implements OnInit {
  columns: IColumn[] = [
    {
      columnDef: 'name',
      header: 'common.name',
      flex: 0.3,
    },
    {
      columnDef: 'code',
      header: 'common.code',
    },
    {
      columnDef: 'description',
      header: 'common.description',
    },
    {
      columnDef: 'createdDate',
      header: 'common.createdDate',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.createdDate))
    },
    {
      columnDef: 'modifiedDate',
      header: 'common.modifiedDate',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.modifiedDate))
    },
    {
      columnDef: 'status',
      header: 'common.status',
    },
    {
      columnDef: 'action',
      header: 'common.action',
      actions: ['edit', 'delete'],
    }
  ];

  constructor(injector: Injector, private departmentService: DepartmentManagementService) {
    super(injector, departmentService);

  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    this.processSearch();
  }

  actionClick(e: any): void {
    switch (e.type) {
      case 'delete':
        this.deleteDepartment(e.data.id);
        break;
      case 'edit':
        this.addOrEditDepartment(e.data);
        break;
    }
  }

  deleteDepartment(id: any): void {
    this.showDialog(ConfirmDialogComponent, {}, (value) => {
      if (value) {
        this.departmentService.delete(id).subscribe((res) => {
          if (res.status) {
            this.showSnackBar('Xóa thành công', 'success');
            this.processSearch();
          }
        });
      }
    });
  }

  addOrEditDepartment(department: any): void {
    this.showDialog(AddOrEditDepartmentComponent, {
      data: {
        department
      },
      width: '50vw'
    }, (value) => {
      if (value) {
        this.showSnackBar('Thêm mới thành công', 'success');
        this.processSearch();
      }
    });
  }
}
