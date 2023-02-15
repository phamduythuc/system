import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {DepartmentService} from '@shared/services/department.service';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {AddOrEditDepartmentComponent} from './add-or-edit-department/add-or-edit-department.component';
import {CommonUtilsService} from '@shared/common-utils.service';
import {DetailsDepartmentComponent} from './details-department/details-department.component';
import {AccountService} from '@core/auth/account.service';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.scss']
})
export class DepartmentManagementComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSPB';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.1
    },
    {
      columnDef: 'name',
      header: 'hrm-management.department.form.name',
      flex: 0.3

    },
    {
      columnDef: 'code',
      header: 'common.code',
      flex: 0.2
    },
    {
      columnDef: 'parentName',
      header: 'common.parentName',
      flex: 0.4

    },
    {
      columnDef: 'description',
      header: 'common.description',
      flex: 0.2

    },
    {
      columnDef: 'createdDate',
      header: 'common.createdDate',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.createdDate)),
      flex: 0.2
    },
    {
      columnDef: 'createdBy',
      header: 'common.createdBy',
      flex: 0.2
    },
    {
      columnDef: 'modifiedDate',
      header: 'common.modifiedDate',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.modifiedDate)),
      flex: 0.2
    },
    {
      columnDef: 'modifiedBy',
      header: 'common.modifiedBy',
      flex: 0.2
    },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: ['view', 'edit', 'delete'],
    }
  ];
  formSearch = this.fb.group({
    keyword: ['']
  });
  panelOpenState: false;

  list_status = []

  typeStatus = '1';

  constructor(injector: Injector, private departmentService: DepartmentService) {
    super(injector, departmentService);
    this.list_status = JSON.parse(localStorage.getItem('listType')).LIST_STATUS;

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

  getParentIds(arr: any[]): any[] {
    return arr.map(item => item.parentId).filter(item => item);
  }

  doSearch() {
    this.searchModel = {...this.searchModel,page:0, ...this.formSearch.value};
    this.processSearch(this.searchModel);
  }

  actionClick(e: any): void {
    switch (e.type) {
      case 'delete':
        this.deleteConfirmDialog(e.data.id);
        break;
      case 'edit':
        this.addOrEditDepartment(e.data.id);
        break;
      case 'view':
        this.showDetail(e.data.id);
    }
  }

  showDetail(id) {
    this.showDialog(DetailsDepartmentComponent, {
        data: {
          id,
          departments: this.searchResult.data,
        },
        width: '60vw',
        // height: '50vh',
        disableClose: true
      }
    );
  }

  addOrEditDepartment(id?: any): void {
    const ref = this.showDialog(AddOrEditDepartmentComponent, {
      data: {
        id,
        departments: this.searchResult.data,
      },
      width: '60vw',
      // height: '45vh',
      disableClose: true
    }, (value) => {
      if (value)
        this.doSearch()
    });
    // ref.onclose()
  }

  // addOrEditDepartment(department: any): void {
  //   this.showDialog(AddOrEditDepartmentComponent, {
  //     data: {
  //       department
  //     },
  //     width: '50vw'
  //   }, (value) => {
  //     if (value) {
  //       this.showSnackBar('Thêm mới thành công', 'success');
  //       this.processSearch(this.searchModel);
  //     }
  //   });
  // }
}
