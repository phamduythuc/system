import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { GetListComponent } from '@core/getList.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { AchievementService } from '@shared/services/achievement.service';
import { ContractService } from '@shared/services/contract.service';
import { StaffService } from '@shared/services/staff.service';
import { AddOrEditContractComponent } from './add-or-edit-contract/add-or-edit-contract.component';
import { DetailsContractComponent } from './details-contract/details-contract.component';
import FileSaver from 'file-saver';

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
      flex: 1,
    },
    {
      columnDef: 'staffName',
      header: 'hrm-management.staff.title',
      flex: 1,
    },
    {
      columnDef: 'type',
      header: 'hrm-management.staff.detail.contract.contract',
      flex: 1,
    },
    {
      columnDef: 'termPeriod',
      header: 'hrm-management.staff.detail.contract.duration',
      flex: 0.5,
    },
    {
      columnDef: 'effDate',
      header: 'hrm-management.staff.detail.contract.startTime',
      flex: 0.5,
    },
    {
      columnDef: 'expDate',
      header: 'hrm-management.contract.expDate',
      flex: 0.5,
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

  dataDocument = [];
  listUser: any = [];

  constructor(
    injector: Injector,
    public staffService: StaffService,
    public achievementService: AchievementService,
    public contractService: ContractService
  ) {
    super(injector, contractService, achievementService);
    this.getListUser();
  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    this.doSearch();
  }

  mapData(data: any) {
    data.map((x) => {
      x.type = this.getTypeContract(x.type);
      x.effDate = CommonUtilsService.dateToString(x.effDate, false);
      // x.salary = x.salary.toLocaleString() + ' đ';
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
    this.processSearch(this.searchModel, () => {
      this.searchResult.data = this.mapData(this.searchResult.data);
      this.dataDocument = this.searchResult.data.map((item) => item.documentName);
    });
  }

  actionClick(e: any): void {
    switch (e.type) {
      case 'delete':
        this.deleteConfirmDialog(e.data.id);
        break;
      case 'edit':
        this.addOrEdit(e.data.id);
        break;
      case 'add':
        this.addOrEdit();
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

  addOrEdit(id?: any): void {
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
        if (value) {
          this.doSearch();
        }
      }
    );
    // ref.onclose()
  }

  download(data: any, documentName: any) {
    this.achievementService
      .renderFile({
        filePath: data,
        fileType: 2,
      })
      .subscribe((res) => {
        const res1 = this.getResponseFromHeader(res.headers);
        if (this.isSuccess(res1)) {
          FileSaver.saveAs(res.body, documentName);
        } else {
          this.showSnackBar(res1.message, 'error');
        }
      });
  }

  getListCategories() {
    return JSON.parse(localStorage.getItem('listType'));
  }

  getListUser() {
    const keyStatus = {
      status: 1,
    };
    this.staffService.getListStaffOnl(keyStatus).subscribe((res: any) => {
      this.listUser = res.data;
    });
  }

  formatDate(date) {
    return CommonUtilsService.dateToString(date, false);
  }



  formatCurrency(currency) {
    return CommonUtilsService.formatVND(currency);
  }
}
