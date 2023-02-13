import { Component, Injector, OnInit } from '@angular/core';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { BaseComponent } from '@core/base.component';
import { PositionService } from '@shared/services/position.service';
import { AddOrEditPositionComponent } from './compoment/add-or-edit-position/add-or-edit-position.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { DetailPositionComponent } from './compoment/detail-position/detail-position.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-position-management',
  templateUrl: './position-management.component.html',
  styleUrls: ['./position-management.component.scss'],
})
export class PositionManagementComponent
  extends BaseComponent
  implements OnInit
{
  _permissionCodeName = 'DSVT';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'name',
      header: 'common.name_position',
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
    keyword: ['', Validators.maxLength(100)],
  });

  // paginate = {
  //   page: 0,
  //   size: 10,
  //   total: 0
  // };
  positions = [];
  // panelOpenState: boolean = false;

  list_status = [];

  typeStatus = '1';

  constructor(injector: Injector, private positionService: PositionService) {
    super(injector, positionService);

    this.list_status = JSON.parse(localStorage.getItem('listType')).LIST_STATUS;
  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    this.doSearch();
  }

  filterStatus(data) {
    if (data) {
      this.searchModel.status = Number(data);
    } else {
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
    if (e.type === 'view') {
      this.showDetail(e.data.id);
    }
    if (e.type === 'edit') {
      this.addOrEditPosition(e.data.id);
    }
    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id);
    }
  }

  showDetail(id) {
    this.showDialog(DetailPositionComponent, {
      data: {
        id,
      },
      width: '60vw',
      // height: '45vh',
      disableClose: true,
    });
  }

  addOrEditPosition(id?: any): void {
    const ref = this.showDialog(
      AddOrEditPositionComponent,
      {
        data: {
          id,
        },
        width: '60vw',
        // height: '45vh',
        disableClose: true,
      },
      (value) => {
        if (value) {
          this.doSearch();
        }
      }
    );
    // ref.onclose()
  }
}
