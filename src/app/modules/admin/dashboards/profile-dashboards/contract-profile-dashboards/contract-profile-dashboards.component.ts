import { Component, Input, OnInit, Injector } from '@angular/core';
import { GetListComponent } from '@core/getList.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { AchievementService } from '@shared/services/achievement.service';
import { ContractService } from '@shared/services/contract.service';
import { StaffService } from '@shared/services/staff.service';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-contract-profile-dashboards',
  templateUrl: './contract-profile-dashboards.component.html',
  styleUrls: ['./contract-profile-dashboards.component.scss'],
})
export class ContractProfileDashboardsComponent
  extends GetListComponent
  implements OnInit
{
  @Input() data: any;

  searchModel: any;
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
      columnDef: 'type',
      header: 'hrm-management.staff.detail.contract.contract',
    },
    {
      columnDef: 'termPeriod',
      header: 'hrm-management.staff.detail.contract.duration',
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
  ];

  constructor(
    injector: Injector,
    public achievementService: AchievementService,
    public ContractService: ContractService
  ) {
    super(injector, ContractService, achievementService);
  }

  ngOnInit(): void {
    this.searchModel = { staffId: this.data };
    this.doSearch();
  }

  mapData(data: any) {
    const VND = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

    data.map((x) => {
      x.type = this.getTypeContract(x.type);
      x.effDate = CommonUtilsService.dateToString(x.effDate, false);
      x.salary = VND.format(parseInt(x.salary));
      return x;
    });
    return data;
  }

  doSearch() {
    if(this.data){
      this.processSearch(this.searchModel, () => {
        this.searchResult.data = this.mapData(this.searchResult.data);
      });
    }else{
      this.ContractService.getListContractByToken().subscribe(res=>{
        console.log(res);
        this.searchResult.data = this.mapData(res.data);
      })
    }

  }

  handleDataKPI(data) {
    this.data.data = data;
  }

  download(data: any) {
    this.achievementService
      .renderFile({
        filePath: data,
        fileType: 2,
      })
      .subscribe((res) => {
        const res1 = this.getResponseFromHeader(res.headers);
        if (this.isSuccess(res1)) {
          const fileName = this.getFileName(res.headers);
          FileSaver.saveAs(res.body, fileName);
        } else {
          this.showSnackBar(res1.message, 'error');
        }
      });
  }
}
