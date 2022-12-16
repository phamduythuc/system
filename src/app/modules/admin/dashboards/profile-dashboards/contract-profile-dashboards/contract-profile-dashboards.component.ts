import { Component, Input, OnInit } from '@angular/core';
import { IColumn } from '@layout/common/data-table/data-table.component';

@Component({
  selector: 'app-contract-profile-dashboards',
  templateUrl: './contract-profile-dashboards.component.html',
  styleUrls: ['./contract-profile-dashboards.component.scss']
})
export class ContractProfileDashboardsComponent implements OnInit {
    @Input() data:any

  searchModel:any
  _permissionCodeName = 'DSNV';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'contract_code',
      header: 'hrm-management.staff.detail.contract.contract_code',
      flex: 0.7,
    },
    {
      columnDef: 'contract',
      header: 'hrm-management.staff.detail.contract.contract',
    },
    {
      columnDef: 'duration',
      header: 'hrm-management.staff.detail.contract.duration',
      flex: 0.5,
    },
    {
      columnDef: 'startTime',
      header: 'hrm-management.staff.detail.contract.startTime',
    },
    {
      columnDef: 'salary',
      header: 'hrm-management.staff.detail.contract.salary',
      flex: 0.5,
    },
    {
      columnDef: 'link',
      header: 'hrm-management.staff.detail.contract.link',
      flex: 0.5,
    },
  ];
  

  constructor() { }

  ngOnInit(): void {
    this.searchModel = {
      page: 0,
      pageSize: 10,
      status: 1,
      keyword: '',
    };
  }

  handleDataKPI(data){
    console.log(data);
    this.data.data = data
  }

}
