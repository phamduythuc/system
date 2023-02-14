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
  searchResult : any;
  count: any;
  _permissionCodeName = 'DSNV';
  
  paginate: any = {
    keyword: '',
    month: '',
    page: 0,
    pageSize: 10,
    status: 1,
  };

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
      columnDef: 'effDate',
      header: 'hrm-management.staff.detail.contract.startTime',
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
    this.searchModel = { 
      staffId: this.data, 
      page: 0,
      pageSize: 10,
      status:1 
    };
    this.doSearch();
  }

  mapData(data: any) {
    this.count = data.length;
    data.map((x) => {
      x.type = this.getTypeContract(x.type);
      x.effDate = CommonUtilsService.dateToString(x.effDate, false);
      x.salary = CommonUtilsService.formatVND(parseInt(x.salary));
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
        console.log(this.searchResult);
      })
    }

  }

  handleDataKPI(data) {
    this.data.data = data;
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
}
