import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {PartnerService} from '@shared/services/partner.service';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {CommonUtilsService} from '@shared/common-utils.service';
import {AddOrEditPartnerComponent} from './component/add-or-edit-partner/add-or-edit-partner.component';
import {DetailsDepartmentComponent} from '../department-management/details-department/details-department.component';
import {DetailsPartnerComponent} from './component/details-partner/details-partner.component';

@Component({
  selector: 'app-partner-management',
  templateUrl: './partner-management.component.html',
  styleUrls: ['./partner-management.component.scss']
})
export class PartnerManagementComponent extends BaseComponent implements OnInit {
  _permissionCodeName='DSDT';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'name',
      header: 'common.name',
      flex: 0.3,
    },
    {
      columnDef: 'phone',
      header: 'common.phone',
    },
    {
      columnDef: 'address',
      header: 'common.address',
    },
    {
      columnDef: 'createdDate',
      header: 'common.createdDate',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.createdDate))
    },
    // {
    //   columnDef: 'createBy',
    //   header: 'common.createBy',
    // },
    {
      columnDef: 'note',
      header: 'common.note',
    },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: ['view','edit', 'delete'],
    }
  ];
  formSearch = this.fb.group({
    name: [''],
    address: [''],
    // phone: ['']
  });

  paginate = {
    page: 0,
    size: 10,
    total: 0
  };
  partners = [];
  panelOpenState: false;

  constructor(injector: Injector,
              partnerService: PartnerService) {
    super(injector, partnerService);
  }

  ngOnInit(): void {
    this.searchModel.status = 1
    this.doSearch();
  }

  doSearch() {
    this.searchModel= {...this.searchModel,...this.formSearch.value};
    this.processSearch(this.searchModel);
  }

  // changePage(e: any): void {
  //   this.paginate.size = e.pageSize;
  //   this.paginate.page = e.pageIndex;
  //   this.searchModel.page = this.paginate.page
  //   this.searchModel.pageSize = this.paginate.size
  // }

  actionClick(e: any): void {
    console.log(e);
    if (e.type === 'edit') {
      this.addOrEditPartner(e.data.id);
    }
    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id);
    }
    if (e.type === 'view') {
      this.showDetail(e.data.id);
    }
  }

  showDetail(id){
    this.showDialog(DetailsPartnerComponent, {
        data: {
          id
        },
        width: '60vw',
        // height: '50vh',
        disableClose: true
      }
    );
  }

  // deletePartner(id: any) {
  //   this.deleteConfirmDialog(id);
  // }

  addOrEditPartner(id?: any): void {
    const ref = this.showDialog(AddOrEditPartnerComponent, {
      data: {
        id,
      },
      width: '60vw',
      // height: '20vh',
      disableClose: true
    }, (value) => {
      if (value)
        this.doSearch()
    });
    // ref.onclose()
  }
}
