import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from '@core/base.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { SalaryService } from '@shared/services/salary.service';
import moment, { Moment } from 'moment';

import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-salary-management',
  templateUrl: './salary-management.component.html',
  styleUrls: ['./salary-management.component.scss'],
})
export class SalaryManagementComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSNV';
  value: any;
  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
    },
    {
      columnDef: 'staffCode',
      header: 'hrm-management.salary.staffID',
      flex: 1,
    },
    {
      columnDef: 'fullName',
      header: 'hrm-management.salary.name',
      flex: 1,
    },
    {
      columnDef: 'salary',
      header: 'hrm-management.salary.salaryVND',
      flex: 1,
    },
    {
      columnDef: 'salaryActual',
      header: 'hrm-management.salary.salaryReceived',
      flex: 1,
    },
  ];
  startDate = this.fb.group({
    startMonth: [moment().startOf('month'), Validators.required],
    keyword: ['']
  });

  listUser: any = [];
  basicListUser: any = [];

  constructor(
    injector: Injector,
    public SalaryService: SalaryService,
    private _adapter: DateAdapter<any>
  ) {
    super(injector, SalaryService);
    this.view();
  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    this.view();
    this.translocoService.langChanges$.subscribe((activeLang) => {
      this._adapter.setLocale(activeLang);
    });
  }

  mapData(data: any) {
    data.map((x) => {
      x.salary = x.salary.toLocaleString();
      this.listUser.map((z) => {
        if (z.id == x.staffId) {
          x.staffId = z.fullName;
        }
      });
      return x;
    });
    return data;
  }

  paginate: any = {
    keyword: '',
    month: '',
    page: 0,
    pageSize: 10,
    status: 1,
  };

  changePage(e: any) {
    this.paginate.month = CommonUtilsService.dateToString(
      this.startDate.value.startMonth,
      false
    );
    this.paginate.pageSize = e.pageSize;
    this.paginate.page = e.pageIndex;
    this.paginate.keyword = this.startDate.value.keyword,
    this.view(this.paginate);
  }

  doSearch() {
    this.searchModel = {
      keyword: this.startDate.value.keyword,
      ...this.searchModel,
      page: 0,
      ...this.startDate.value,
    };

    this.processSearch(this.searchModel, () => {});
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
    this.view();
  }

  handleDataKPI(data) {}

  view(paginate?) {
    let params: any = {};
    
    if (paginate) {
      params = paginate;
    } else {
      const month = CommonUtilsService.dateToString(
        this.startDate.value.startMonth,
        false
      );
      params = {
        keyword: this.startDate.value.keyword,
        month: month,
        page: 0,
        pageSize: 10,
        status: 1,
      };
    }

    this.SalaryService.getViewSalarybyMonth(params).subscribe((res) => {
      if (res.code === '00') {
        this.searchResult.totalRecords = res.totalRecords;
        const VND = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        });
        let convertData = res.data.map((obj) => {
          return {
            fullName: obj.fullName,
            // salaryActual: parseInt(obj.salaryActual),
            salary: VND.format(parseInt(obj.salary)),
            salaryActual: CommonUtilsService.formatCurrency(obj.salaryActual),
            revenueMonth: obj.revenueMonth,
            staffCode: obj.staffCode,
            staffId: obj.staffId,
          };
        });
        this.searchResult.data = convertData;
      }
    });
  }

  validateNumber(event) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }

  saveData(e) {
    const newObj = e.map((item) => {
      const obj = {
        staffId: item.staffId,
        salaryActual: item.salaryActual
          ?.replace(',', '')
          .replace(',', '')
          .replace(',', '')
          .replace(',', ''),
      };
      return obj;
    });

    const month = CommonUtilsService.dateToString(
      this.startDate.value.startMonth,
      false
    );

    const params = {
      revenueMonth: month,
      listSalary: [...newObj],
    };

    this.SalaryService.saveSalary(params).subscribe((res) => {
      if (res.code === '00') {
        this.showSnackBar(res.message, 'success');
        this.view();
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }

  change(data) {
    this.searchResult.data.map((x) => {
      if (x.staffId == data) {
        console.log(x);
        
        x.salaryActual = CommonUtilsService.formatCurrency(x.salaryActual);
      }
      return x;
    });
  }
}
