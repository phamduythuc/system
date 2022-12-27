import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { GetListComponent } from '@core/getList.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { AchievementService } from '@shared/services/achievement.service';
import { StaffService } from '@shared/services/staff.service';
import { AddOrEditContractComponent } from './add-or-edit-contract/add-or-edit-contract.component';
import { DetailsContractComponent } from './details-contract/details-contract.component';

@Component({
  selector: 'app-contract-management',
  templateUrl: './contract-management.component.html',
  styleUrls: ['./contract-management.component.scss'],
})
export class ContractManagementComponent
  extends GetListComponent
  implements OnInit
{
  _permissionCodeName = 'DSNV';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'code',
      header: 'hrm-management.staff.detail.contract.contract_code',
      flex: 0.7,
    },
    {
      columnDef: 'staffId',
      header: 'hrm-management.staff.title',
    },
    {
      columnDef: 'type',
      header: 'hrm-management.staff.detail.contract.contract',
    },
    {
      columnDef: 'termPeriod',
      header: 'hrm-management.staff.detail.contract.duration',
      flex: 0.5,
    },
    {
      columnDef: 'effDate',
      header: 'hrm-management.staff.detail.contract.startTime',
    },
    {
      columnDef: 'salary',
      header: 'hrm-management.staff.detail.contract.salary',
      flex: 0.5,
    },
    {
      columnDef: 'contractFilePath',
      header: 'hrm-management.staff.detail.contract.link',
      flex: 0.5,
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

  listUser: any = [];

  constructor(
    injector: Injector,
    public StaffService: StaffService,
    public achievementService: AchievementService
  ) {
    super(injector, StaffService, achievementService);
    this.searchResult.data = [
      {
        id: 5,
        staffId: 355,
        code: 'CT5',
        type: 1,
        status: 1,
        effDate: '2022-01-01T00:00:00Z',
        expDate: '2023-01-01T00:00:00Z',
        signDate: '2022-01-01T00:00:00Z',
        salary: 100000000,
        insurance: 500000.0,
        termPeriod: 2,
        contractFilePath: 'contract/0e391dea-a695-40bc-bc52-d619ea580882.docx',
        createdDate: '2022-12-22T02:33:43Z',
        modifiedDate: '2022-12-22T02:33:43Z',
        createdBy: 'admin',
        modifiedBy: null,
      },
      {
        id: 2,
        staffId: 302,
        code: 'CT2',
        type: 2,
        status: 1,
        effDate: '2022-01-01T00:00:00Z',
        expDate: '2023-01-01T00:00:00Z',
        signDate: '2022-01-01T00:00:00Z',
        salary: 100000000,
        insurance: 500000.0,
        termPeriod: 2,
        contractFilePath: 'contract/0e391dea-a695-40bc-bc52-d619ea580882.docx',
        createdDate: '2022-12-22T02:33:43Z',
        modifiedDate: '2022-12-22T02:33:43Z',
        createdBy: 'admin',
        modifiedBy: null,
      },
    ];
    this.searchResult.totalRecords = 2;
    this.getListUser();
  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    // this.doSearch();
  }

  mapData(data: any) {
    data.map((x) => {
      x.type = this.getTypeContract(x.type);
      x.effDate = CommonUtilsService.dateToString(x.effDate, false);
      x.salary = x.salary.toLocaleString() + ' đ';

      this.listUser.map((z) => {
        if (z.id == x.staffId) {
          x.staffId = z.fullName;
        }
      });

      return x;
    });

    return data;
  }

  doSearch() {
    this.searchModel = {
      ...this.searchModel,
      page: 0,
      ...this.formSearch.value,
    };
    this.processSearch(this.searchModel, () => {});
  }

  actionClick(e: any): void {
    switch (e.type) {
      case 'delete':
        this.deleteConfirmDialog(e.data.id);
        break;
      case 'edit':
        this.addOrEditDepartment(e.data.id);
        break;
      case 'add':
        this.addOrEditDepartment();
        break;
      case 'view':
        this.showDetail(e.data.id);
    }
  }

  showDetail(id) {
    this.showDialog(DetailsContractComponent, {
      data: {
        id,
        listUser: this.listUser,
        listCaregories: this.getListCategories(),
      },
      width: '60vw',
      // height: '50vh',
      disableClose: false,
    });
  }

  addOrEditDepartment(id?: any): void {
    const ref = this.showDialog(
      AddOrEditContractComponent,
      {
        data: {
          id,
          listUser: this.listUser,
          listCaregories: this.getListCategories(),
        },
        width: '60vw',
        // height: '45vh',
        disableClose: false,
      },
      (value) => {
        if (value) this.doSearch();
      }
    );
    // ref.onclose()
  }

  download(data: any) {
    this.achievementService
      .renderFile({
        filePath: data,
        fileType: '1',
      })
      .subscribe((res1) => {});
  }

  getListUser() {
    this.StaffService.getListAllUser().subscribe((res: any) => {
      this.listUser = res.data;
      this.searchResult.data = this.mapData(this.searchResult.data);
    });
  }

  getListCategories() {
    return JSON.parse(localStorage.getItem('listType'));
  }
}
