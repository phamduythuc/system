import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { CommonUtilsService } from '@shared/common-utils.service';
import { DashboardsProfileService } from '@shared/services/dashboards-profile.service';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-chart-profile-dashboards',
  templateUrl: './chart-profile-dashboards.component.html',
  styleUrls: ['./chart-profile-dashboards.component.scss'],
})
export class ChartProfileDashboardsComponent implements OnInit {
  @Output() changeData = new EventEmitter<any>();

  options: any = {
    chart: {
      type: 'line',
    },
    title: {
      text: this.translocoService.translate(
        'hrm-management.staff.chartKPI.title'
      ),
    },
    yAxis: {
      title: {
        text: 'KPI',
      },
    },
    xAxis: {
      categories: [],
    },
    series: [],
  };

  data: any;

  formGroup = this._formBuilder.group({
    startMonth: [
      moment().subtract(7, 'months'),
      Validators.required,
    ],
    endMonth: [moment().subtract(1, 'months'), Validators.required],
    staffId: [503],
  });

  random: any;

  constructor(
    private translocoService: TranslocoService,
    private _formBuilder: FormBuilder,
    private DashboardsProfileService: DashboardsProfileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.random = (Math.random() + 1).toString(36).substring(7);
  }

  ngOnInit(): void {
    this.data = [
      {
        name: 'KPI mục tiêu',
        data: [],
        type: 'effortExchange',
      },
      {
        name: 'KPI đảm bảo',
        data: [],
        type: 'kpiTarget',
      },
      {
        name: 'KPI thực tế',
        data: [],
        type: 'kpiInsure',
      },
    ];

    let payload = {
      startMonth: CommonUtilsService.dateToString(
        moment().add(-7, 'month').startOf('month')
      ),
      endMonth: CommonUtilsService.dateToString(
        moment().add(-1, 'month').startOf('month')
      ),
      staffId: 503,
    };
    this.view(payload);
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

  view(data?) {
    this.formGroup.value.startMonth = CommonUtilsService.dateToString(
      this.formGroup.value.startMonth
    );
    this.formGroup.value.endMonth = CommonUtilsService.dateToString(
      this.formGroup.value.endMonth
    );
    this.changeData.emit(this.formGroup.value);

    let payload = data ? data : this.formGroup.value;

    this.DashboardsProfileService.getKPI(payload).subscribe((res: any) => {
      if ('00' === res.code) {
        if (res.data.length > 0) {
          this.data = [
            {
              name: 'KPI mục tiêu',
              data: [],
              type: 'effortExchange',
            },
            {
              name: 'KPI đảm bảo',
              data: [],
              type: 'kpiTarget',
            },
            {
              name: 'KPI thực tế',
              data: [],
              type: 'kpiInsure',
            },
          ];

          this.renderKPI(res.data);
          this.random = (Math.random() + 1).toString(36).substring(7);
        } else {
          this.options.series = [];
        }
        if (!data) {
          // this.showSnackBar(res.message, 'success');
        }
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }

  renderKPI(data: any) {
    for (let i = 0; i < data.length; i++) {
      this.data.map((x: any) => {
        if (x.type == 'effortExchange') {
          x.data.push(data[i].effortExchange);
        }
        if (x.type == 'kpiTarget') {
          x.data.push(data[i].kpiTarget);
        }
        if (x.type == 'kpiInsure') {
          x.data.push(data[i].kpiInsure);
        }
        return x;
      });
    }

    this.data.map((x: any) => {
      delete x['type'];
    });

    this.options.series = this.data;
  }

  showSnackBar(messages?: string, type?: string): void {
    this.snackBar.open(messages, null, {
      panelClass:
        type === 'success'
          ? 'bg-lime-500'
          : type === 'warning'
          ? 'bg-yellow-500'
          : 'bg-red-500',
    });
  }
}
