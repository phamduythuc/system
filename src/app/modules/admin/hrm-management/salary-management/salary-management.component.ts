import { Component, OnInit,Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from '@core/base.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { StaffService } from '@shared/services/staff.service';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-salary-management',
  templateUrl: './salary-management.component.html',
  styleUrls: ['./salary-management.component.scss']
})
export class SalaryManagementComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSNV';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'staffId',
      header: 'hrm-management.staff.title',
    },
    {
      columnDef: 'salary',
      header: 'hrm-management.staff.detail.contract.salary',
    },
    {
      columnDef: 'salaryActual',
      header: 'hrm-management.staff.detail.contract.salary',
      flex: 1.7,
    },
    // {
    //   columnDef: 'action',
    //   header: 'common.actions',
    //   actions: ['view', 'edit'],
    //   flex: 1.3,
    // },
  ];
  startDate = this.fb.group({
    startMonth: [moment().startOf('month'), Validators.required],
  });

  paginate = {
    page: 0,
    size: 10,
    total: 0,
  };

  listUser: any = [];

  constructor(injector: Injector, public StaffService: StaffService) {
    super(injector, StaffService);
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
    this.searchResult.totalRecords = this.searchResult.data.length;
    this.getListUser();
  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    // this.doSearch();
  }

  mapData(data: any) {
    data.map((x) => {
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
      ...this.startDate.value,
    };
    this.processSearch(this.searchModel, () => {});
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

  chosenYearHandler(normalizedYear: Moment, formTarget): void {
    const ctrlValue = formTarget.value;
    ctrlValue.year(normalizedYear.year());
    formTarget.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: any,
    formTarget
  ): void {
    const ctrlValue = formTarget.value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.date('1');
    formTarget.setValue(ctrlValue);
    datepicker.close();
  }

  handleDataKPI(data) {
    console.log(data);
  }

  view(){
    console.log(CommonUtilsService.dateToString(this.startDate.value.startMonth, false));
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
      }
    ];

    this.searchResult.totalRecords = this.searchResult.data.length;

  }
  saveData(){

  }
}
