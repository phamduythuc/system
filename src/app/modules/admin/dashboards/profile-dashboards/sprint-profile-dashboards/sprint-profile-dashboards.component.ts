import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { BaseComponent } from '@core/base.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { TranslocoService } from '@ngneat/transloco';
import { CommonUtilsService } from '@shared/common-utils.service';
import { DashboardsProfileService } from '@shared/services/dashboards-profile.service';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-sprint-profile-dashboards',
  templateUrl: './sprint-profile-dashboards.component.html',
  styleUrls: ['./sprint-profile-dashboards.component.scss'],
})
export class SprintProfileDashboardsComponent
  extends BaseComponent
  implements OnInit
{
  @Input() staffId: any;

  @Output() callback = new EventEmitter<any>();

  _permissionCodeName = 'DSNV';

  listPercentEffort: any = [];

  sumPercentEffort: number;

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
    },
    {
      columnDef: 'projectId',
      header: 'dashboard.profile.tab.sprint.project_code',
    },
    {
      columnDef: 'projectName',
      header: 'dashboard.profile.tab.sprint.project_name',
    },
    {
      columnDef: 'effort',
      header: 'dashboard.profile.tab.sprint.recognize',
    },
    {
      columnDef: 'effortExchange',
      header: 'dashboard.profile.tab.sprint.recognize_exchange',
    },
    {
      columnDef: 'percentEffort',
      header: 'dashboard.profile.tab.sprint.time_percent',
    },
  ];

  startDate = this._formBuilder.group({
    startMonth: [moment().add(0, 'month').startOf('month')],
  });

  formGroup = this._formBuilder.group({
    salary: [''],
    kpiTarget: [''],
    salaryActual: [''],
    kpiInsure: [''],
  });

  data: any = [];

  disabledBtn = false;

  paginate: any = {
    month: '',
    page: 0,
    pageSize: 10,
    status: 1,
    staffId: '',
  };

  constructor(
    injector: Injector,
    private _formBuilder: FormBuilder,
    public DashboardsProfileService: DashboardsProfileService,
    private _adapter: DateAdapter<any>
  ) {
    super(injector, DashboardsProfileService);
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.formGroup.patchValue(this.data);
    // this.data = this.data;
    // this.formGroup.patchValue(this.data?.salary);
    this.changePercentEffort();
  }

  ngOnInit(): void {
    this.paginate.month = CommonUtilsService.dateToString(
      this.startDate.value.startMonth,
      false
    );
    this.paginate.staffId = this.staffId;

    this.getData(this.paginate);
    this.translocoService.langChanges$.subscribe((activeLang) => {
      this._adapter.setLocale(activeLang);
    });
  }

  changePage(e: any) {
    this.paginate.month = CommonUtilsService.dateToString(
      this.startDate.value.startMonth,
      false
    );
    this.paginate.pageSize = e.pageSize;
    this.paginate.page = e.pageIndex;
    this.paginate.staffId = this.staffId;

    this.view(this.paginate);
  }

  doSearch() {
    this.processSearch(this.paginate);
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

    this.paginate.month = CommonUtilsService.dateToString(
      this.startDate.value.startMonth,
      false
    );

    this.getData(this.paginate);
  }

  getData(data) {
    this.DashboardsProfileService.getSprint(data).subscribe((res: any) => {

      this.data = {
        data: res.data,
        totalRecords: res.data.length,
        extraData: res.extraData,
      };

      res.data.forEach((item) => {
        this.listPercentEffort.push(item.percentEffort);
      });

      this.sumPercentEffort = Number(
        this.listPercentEffort.reduce((acc, cur) => acc + cur, 0)
      );

      // if (this.sumPercentEffort === 100) {
      //   this.disabledBtn = false;
      // } else {
      //   this.disabledBtn = true;
      // }

      if (res.extraData) {
        res.extraData.salary = CommonUtilsService.formatVND(
          res.extraData.salary
        );
        res.extraData.salaryActual = CommonUtilsService.formatVND(
          res.extraData.salaryActual
        );
        this.formGroup.patchValue(res.extraData);
      } else {
        this.formGroup.patchValue({
          salary: 0,
          kpiTarget: 0,
          salaryActual: 0,
          kpiInsure: 0,
        });
      }
    });
  }

  changePercentEffort() {
    let total = 0;
    this.data?.data.map((x) => {
      total += Number(x.percentEffort);
    });
  }

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
        month: month,
        page: 0,
        pageSize: 10,
        status: 1,
        staffId: this.staffId,
      };
    }
    this.startDate.value.startMonth = CommonUtilsService.dateToString(
      this.startDate.value.startMonth
    );
    this.getData(params);
    // this.callback.emit(this.startDate.value.startMonth);
  }

  handleDataKPI(data) {
    // this.data.data = data;
  }

  saveData() {
    this.data?.data.map((x) => {
      x.acceptanceEffort = Number(x.percentEffort);

      return x;
    });

    let payload = {
      month: CommonUtilsService.dateToString(this.startDate.value.startMonth),
      effortDetail: this.data?.data,
    };

    this.DashboardsProfileService.updateEffort(payload).subscribe((res) => {
      if ('00' === res.code) {
        this.showSnackBar(res.message, 'success');
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }
  // changePage(e: any) {
  //   this.paginate.month = CommonUtilsService.dateToString(
  //     this.startDate.value.startMonth,
  //     false
  //   );
  //   this.paginate.pageSize = e.pageSize;
  //   this.paginate.page = e.pageIndex;
  //   this.paginate.keyword = this.startDate.value.keyword,
  //   this.view(this.paginate);
  // }
}
