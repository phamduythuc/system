import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  @Input() data: any;
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

  formGroup = this._formBuilder.group({
    startMonth: [
      moment().add(-7, 'month').startOf('month'),
      Validators.required,
    ],
    endMonth: [moment().add(-7, 'month').startOf('month'), Validators.required],
    staffId: [503],
  });

  random: any;

  constructor(
    private translocoService: TranslocoService,
    private _formBuilder: FormBuilder,
    private DashboardsProfileService: DashboardsProfileService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.random = (Math.random() + 1).toString(36).substring(7);
  
  }

  ngOnInit(): void {
    this.data = [
      {
        name: 'KPI mục tiêu',
        data: [],
        type: 'effortExchange'
      },
      {
        name: 'KPI đảm bảo',
        data: [],
        type: 'kpiTarget'
      },
      {
        name: 'KPI thực tế',
        data: [],
        type: 'kpiInsure'
      }
    ];
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

  view() {
    this.formGroup.value.startMonth = CommonUtilsService.dateToString(
      this.formGroup.value.startMonth
    );
    this.formGroup.value.endMonth = CommonUtilsService.dateToString(
      this.formGroup.value.endMonth
    );
    this.changeData.emit(this.formGroup.value);

    this.DashboardsProfileService.getKPI(this.formGroup.value).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.data = [
            {
              name: 'KPI mục tiêu',
              data: [],
              type: 'effortExchange'
            },
            {
              name: 'KPI đảm bảo',
              data: [],
              type: 'kpiTarget'
            },
            {
              name: 'KPI thực tế',
              data: [],
              type: 'kpiInsure'
            }
          ];

          console.log(res.data);

          this.renderKPI(res.data);
          this.random = (Math.random() + 1).toString(36).substring(7);
        } else {
          this.options.series = [];
        }
      }
    );
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
}
