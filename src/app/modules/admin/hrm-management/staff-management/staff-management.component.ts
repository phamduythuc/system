import {Component, Injector, OnInit} from '@angular/core';
import {IColumn} from "@layout/common/data-table/data-table.component";
import {CommonUtilsService} from "@shared/common-utils.service";
import {BaseComponent} from "@core/base.component";
import {StaffManagementService} from "./staff-management.service";
import {AddOrEditStaffComponent} from "./add-or-edit-staff/add-or-edit-staff.component";
import {DetailsStaffComponent} from "./details-staff/details-staff.component";
import {CategoriesService} from "@core/categories.service";

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent extends BaseComponent implements OnInit {

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'username',
      header: 'common.username',
      flex: 0.3,
    },
    {
      columnDef: 'departmentId',
      header: 'common.department',
      flex: 0.3,
    },
    {
      columnDef: 'gender',
      header: 'common.gender',
    },
    {
      columnDef: 'positionId',
      header: 'common.position',
    },
    {
      columnDef: 'phone',
      header: 'common.phone',
    },
    {
      columnDef: 'companyEmail',
      header: 'common.companyEmail'
    },
    {
      columnDef: 'dateOfBirth',
      header: 'common.dateOfBirth',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.dateOfBirth))
    },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: [ 'edit', 'delete'],
    }
  ];
  formSearch = this.fb.group({
    fullName: [''],
  })

  paginate = {
    page: 0,
    size: 10,
    total: 0
  };
  panelOpenState: false;

  constructor(injector: Injector, public staffService: StaffManagementService,private categoriesService: CategoriesService) {
    super(injector, staffService)
  }

  ngOnInit(): void {
    this.searchModel.status = 1
    this.doSearch();
  }

  doSearch() {
    this.searchModel = {...this.searchModel, ...this.formSearch.value}
    this.processSearch()
  }

  actionClick(e: any): void {
    console.log(e.type)
    if (e.type === 'view') {
      this.showDetail(e.data.id)
    }
    if (e.type === 'edit') {
      this.addOrEdit(e.data.id)
    }
    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id)
    }
  }

  showDetail(id){
    this.showDialog(DetailsStaffComponent, {
        data: {
          id
        },
        width: '80vw',
        height: '80vh',
        disableClose: true
      }
    )
  }

  addOrEdit(id?: any): void {
    const ref = this.showDialog(AddOrEditStaffComponent, {
      data: {
        id,
      },
      width: '80vw',
      height: '80vh',
      disableClose: true
    }, (value) => {
      if (value)
        this.doSearch()
    });
  }
}
