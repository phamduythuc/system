import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { BaseComponent } from '@core/base.component';
import { StaffService } from '@shared/services/staff.service';
import { ProfileDashboardsComponent } from '../../dashboards/profile-dashboards/profile-dashboards.component';
import { FuseConfigService } from '@fuse/services/config';
import { Theme, ViewType } from 'app/core/config/app.config';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss'],
})
export class StaffManagementComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSNV';

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
      columnDef: 'positionNames',
      header: 'common.position',
    },
    {
      columnDef: 'phone',
      header: 'common.phone',
      flex: 0.5,
    },
    {
      columnDef: 'companyEmail',
      header: 'common.companyEmail',
    },
    {
      columnDef: 'salary',
      header: 'common.salary',
    },
    {
      columnDef: 'dateOfBirth',
      header: 'common.dateOfBirth',
      cellRenderer: (element: any) =>
        CommonUtilsService.dateToString(element.dateOfBirth),
    },
    {
      columnDef: 'createdDate',
      header: 'common.createdDate',
      cellRenderer: (element: any) =>
        CommonUtilsService.dateToString(element.createdDate),
    },
    {
      columnDef: 'modifiedDate',
      header: 'common.modifiedDate',
      cellRenderer: (element: any) =>
        CommonUtilsService.dateToString(element.modifiedDate),
    },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: ['view', 'edit'],
      flex: 1.3,
    },
  ];
  
  formSearch = this.fb.group({
    keyword: [''],
  });

  paginate = {
    page: 0,
    size: 10,
    total: 0,
  };

  panelOpenState: false;

  @ViewChild('drawer') drawer: any;

  staffSelected: any;

  list_status: any = [
    {
      type: '1',
      name: 'setting.listStatus.active',
    },
    {
      type: '2',
      name: 'setting.listStatus.notActive',
    },
    {
      type: '',
      name: 'setting.listStatus.all',
    }
  ];

  typeStatus = '1';


  list_type_view: any = [
    {
      type: 'list',
      name: 'setting.typeView.list',
    },
    {
      type: 'grid',
      name: 'setting.typeView.grid',
    }
  ];

  typeView = 'list';

  constructor(
    injector: Injector,
    public staffService: StaffService,
    private _fuseConfigService: FuseConfigService
  ) {
    super(injector, staffService);
    this.typeView = JSON.parse(localStorage.getItem('config')).viewType;
  }

  ngOnInit(): void {
    this.searchModel.status = 1;
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

  showDetail(id) {
    this.showDialog(ProfileDashboardsComponent, {
      data: {
        id,
      },
      width: '60vw',
      height: '80vh',
      disableClose: false,
    });
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

  /**
   * Set the theme on the config
   *
   * @param viewType
   */
  setView(viewType: ViewType): void {
    this._fuseConfigService.config = { viewType };
  }

  filterStatus(data){
    if(data){
      this.searchModel.status = Number(data);
    }else{
    this.searchModel.status = '';
    }
    this.doSearch();
    
  }
}
