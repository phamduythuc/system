import {Component, Injector, OnInit} from '@angular/core';
import {IColumn} from "../../../../layout/common/data-table/data-table.component";
import {BaseComponent} from "../../../../core/base.component";
import {StaffLevelService} from "./staff-level.service";
import {AddOrEditStaffLevelComponent} from "./compoment/add-or-edit-staff-level/add-or-edit-staff-level.component";
import {CommonUtilsService} from "@shared/common-utils.service";
import {DetailsStaffLevelComponent} from "./compoment/details-staff-level/details-staff-level.component";

@Component({
  selector: 'app-staff-level-management',
  templateUrl: './staff-level-management.component.html',
  styleUrls: ['./staff-level-management.component.scss']
})
export class StaffLevelManagementComponent extends BaseComponent implements OnInit {

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
      columnDef: 'description',
      header: 'common.description',
    },
    {
      columnDef: 'code',
      header: 'common.code',
    },
    {
      columnDef: 'createdDate',
      header: 'common.createdDate',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.createdDate))
    },
    {
      columnDef: 'createdBy',
      header: 'common.createdBy',
    },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: ['view','edit', 'delete'],
    }
  ];
  formSearch = this.fb.group({
    name: [''],
  })

  paginate = {
    page: 0,
    size: 10,
    total: 0
  };
  panelOpenState: false;

  constructor(injector: Injector,
              staffLevelService: StaffLevelService) {
    super(injector, staffLevelService);
  }

  ngOnInit(): void {
    this.searchModel.status = 1
    this.doSearch();
  }

  doSearch() {
    this.searchModel = {...this.searchModel, ...this.formSearch.value}
    this.processSearch(this.searchModel)
  }

  // changePage(e: any): void {
  //     this.paginate.size = e.pageSize;
  //     this.paginate.page = e.pageIndex;
  //     this.searchModel.page = this.paginate.page
  //     this.searchModel.pageSize = this.paginate.size
  // }

  actionClick(e: any): void {
    console.log(e);
    if (e.type === 'edit') {
      this.addOrEditStaffLevel(e.data.id)
    }
    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id)
    }
    if (e.type === 'view') {
      this.showDetail(e.data.id)
    }
  }

  showDetail(id){
    this.showDialog(DetailsStaffLevelComponent, {
        data: {
          id
        },
        width: '60vw',
        height: '50vh',
        disableClose: true
      }
    )
  }

  addOrEditStaffLevel(id?: any): void {
    const ref = this.showDialog(AddOrEditStaffLevelComponent, {
      data: {
        id,
      },
      width: '60vw',
      height: '45vh',
      disableClose: true
    }, (value) => {
      if (value)
        this.doSearch()
    });
    // ref.onclose()
  }

}
