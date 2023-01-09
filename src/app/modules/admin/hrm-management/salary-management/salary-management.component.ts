import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from '@core/base.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { StaffService } from '@shared/services/staff.service';
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
      columnDef: 'staffId',
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
  });

  paginate = {
    page: 0,
    size: 10,
    total: 0,
  };

  listUser: any = [];
  basicListUser: any = [];

  constructor(
    injector: Injector,
    public StaffService: StaffService,
    private _adapter: DateAdapter<any>
  ) {
    super(injector, StaffService);
    this.getListUser();
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
    this.view();
  }

  handleDataKPI(data) {}

  view() {
    const month = CommonUtilsService.dateToString(
      this.startDate.value.startMonth,
      false
    );
    const params = {
      month: month,
    };
    this.StaffService.getViewSalarybyMonth(params).subscribe((res) => {
      if (res.code === '00') {
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
  saveData(e) {
    const newObj = e.map((item) => {
      const obj = {
        staffId: item.staffId,
        salaryActual: item.salaryActual
          .replace(',', '')
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
    console.log(params);

    this.StaffService.saveSalary(params).subscribe((res) => {
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
        x.salaryActual = CommonUtilsService.formatCurrency(x.salaryActual);
      }
      return x;
    });
  }
}
