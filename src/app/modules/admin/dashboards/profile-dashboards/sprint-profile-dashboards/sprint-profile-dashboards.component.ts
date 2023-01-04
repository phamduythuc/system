import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
export class SprintProfileDashboardsComponent implements OnInit {
  @Input() staffId: any;

  @Output() callback = new EventEmitter<any>();

  searchModel: any;
  _permissionCodeName = 'DSNV';

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
    startMonth: [moment().add(-1, 'month').startOf('month')],
  });

  formGroup = this._formBuilder.group({
    salary: [''],
    kpiTarget: [''],
    salaryActual: [''],
    kpiInsure: [''],
  });

  data:any = []

  constructor(
    private _formBuilder: FormBuilder,
    private translocoService: TranslocoService,
    private DashboardsProfileService: DashboardsProfileService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // this.formGroup.patchValue(this.data);
    // this.data = this.data;
    // this.formGroup.patchValue(this.data?.salary);
  }

  ngOnInit(): void {
    this.searchModel = {
      page: 0,
      pageSize: 10,
      status: 1,
      keyword: '',
    };
    this.getData(this.startDate.value.startMonth);
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

  getData(data) {
    this.DashboardsProfileService.getSprint({
      month: CommonUtilsService.dateToString(data, false),
      staffId: this.staffId
    }).subscribe((res: any) => {
      
      this.data = {
        data: res.data,
        totalRecords: res.data.length,
        extraData: res.extraData,
      };
      if (res.extraData) {
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

  view() {
    this.startDate.value.startMonth = CommonUtilsService.dateToString(
      this.startDate.value.startMonth
    );
    this.getData(this.startDate.value.startMonth);
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
      month: CommonUtilsService.dateToString(
        this.startDate.value.startMonth
      ),
      effortDetail: this.data?.data,
    };
    this.DashboardsProfileService.updateEffort(payload).subscribe(res=>{
      console.log(res);
      
    })
  }

}
