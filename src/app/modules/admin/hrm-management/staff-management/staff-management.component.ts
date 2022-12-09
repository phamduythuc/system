import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {CommonUtilsService} from '@shared/common-utils.service';
import {BaseComponent} from '@core/base.component';
import {StaffService} from '@shared/services/staff.service';
import {AddOrEditStaffComponent} from './add-or-edit-staff/add-or-edit-staff.component';
import {DetailsStaffComponent} from './details-staff/details-staff.component';
import {StaffKpiComponent} from './staff-kpi/staff-kpi.component';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent extends BaseComponent implements OnInit {
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
    },
    {
      columnDef: 'departmentNames',
      header: 'common.department',
      flex: 0.5,
    },
    {
      columnDef: 'positionId',
      header: 'common.position',
    },
    {
      columnDef: 'phone',
      header: 'common.phone',
      flex: 0.5
    },
    {
      columnDef: 'companyEmail',
      header: 'common.companyEmail'
    },
    {
      columnDef: 'salary',
      header: 'common.salary'
    },
    {
      columnDef: 'dateOfBirth',
      header: 'common.dateOfBirth',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.dateOfBirth))
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
      columnDef: 'action',
      header: 'common.actions',
      actions: [ 'view','edit', 'delete'],
      flex: 1.3,
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
  @ViewChild('drawer') drawer: any;
  staffSelected: any;

  constructor(injector: Injector, public staffService: StaffService) {
    super(injector, staffService);
  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    this.doSearch();
  }

  doSearch() {
    this.searchModel = {...this.searchModel,page:0 , ...this.formSearch.value}
    this.processSearch(this.searchModel)
  }

  actionClick(e: any): void {
    if (e.type === 'view') {
      this.showDetail(e.data.id);
    }
    if (e.type === 'edit') {
      this.addOrEdit(e.data.id);
    }
    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id);
    }
  }

  showDetail(id){
    this.showDialog(StaffKpiComponent, {
        data: {
          id
        },
        width: '60vw',
        disableClose: true
      }
    )
  }

  addOrEdit(id?: any): void {
    // this.showDialog(AddOrEditStaffComponent, {
    //   data: {
    //     id,
    //   },
    //   width: '60vw',
    //   height:'80vh',
    //   disableClose: true
    // }, (value) => {
    //   if (value)
    //     this.doSearch()
    // });

    // if(id){
    //   this.staffSelected = id;
    //   this.drawer.toggle();
    // }else{
    //   this.showDialog(AddOrEditStaffComponent, {
    //     data: {
    //       id,
    //     },
    //     width: '60vw',
    //     height:'80vh',
    //     disableClose: true
    //   }, (value) => {
    //     if (value)
    //       this.doSearch()
    //   });
    // }


    this.staffSelected = id;
    this.drawer.toggle();
  }
  // Drawer by Phong
  openDrawerChange($event: boolean) {
    if (!$event) {
      this.staffSelected = null;
      this.doSearch();
    }
  }
}
