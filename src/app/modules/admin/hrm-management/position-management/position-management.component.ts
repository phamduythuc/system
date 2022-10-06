import {Component, Injector, OnInit} from '@angular/core';
import {IColumn} from "../../../../layout/common/data-table/data-table.component";
import {BaseComponent} from "../../../../core/base.component";
import {PositionManagementService} from "./position-management.service";
import {AddOrEditPositionComponent} from "./compoment/add-or-edit-position/add-or-edit-position.component";
import {CommonUtilsService} from "@shared/common-utils.service";
import {DetailPositionComponent} from "./compoment/detail-position/detail-position.component";

@Component({
  selector: 'app-position-management',
  templateUrl: './position-management.component.html',
  styleUrls: ['./position-management.component.scss']
})
export class PositionManagementComponent extends BaseComponent implements OnInit {
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
      columnDef: 'status',
      header: 'common.status',
    },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: ['view', 'edit', 'delete'],
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
  positions = [];
  panelOpenState: false;

  constructor(injector: Injector,
              private positionService: PositionManagementService) {
    super(injector, positionService);
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
      this.addOrEditPosition(e.data.id)
    }
    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id)
    }
  }

  showDetail(id){
    this.showDialog(DetailPositionComponent, {
        data: {
          id
        },
        width: '60vw',
        height: '45vh',
        disableClose: true
      }
    )
  }

  addOrEditPosition(id?: any): void {
    const ref = this.showDialog(AddOrEditPositionComponent, {
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
