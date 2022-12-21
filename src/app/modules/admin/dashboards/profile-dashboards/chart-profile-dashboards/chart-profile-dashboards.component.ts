import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { CommonUtilsService } from '@shared/common-utils.service';
import moment, {Moment} from 'moment';

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
    startMonth: [moment().add(-7, 'month').startOf('month'),Validators.required],
    endMonth: [moment().add(-7, 'month').startOf('month'),Validators.required],
  });

  random:any

  constructor(
    private translocoService: TranslocoService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.random = (Math.random() + 1).toString(36).substring(7);
    this.options.series = this.data
  }

  ngOnInit(): void {
  }

  chosenYearHandler(normalizedYear: Moment, formTarget): void {
    const ctrlValue = formTarget.value;
    ctrlValue.year(normalizedYear.year());
    formTarget.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: any, formTarget): void {
    const ctrlValue = formTarget.value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.date('1');
    formTarget.setValue(ctrlValue);
    datepicker.close();
  }

  view(){
    this.formGroup.value.startMonth=CommonUtilsService.dateToString(this.formGroup.value.startMonth)
    this.formGroup.value.endMonth=CommonUtilsService.dateToString(this.formGroup.value.endMonth)
    this.changeData.emit(this.formGroup.value)

    this.options.series = [
      {
        name: 'Berlin',
        data: [
          -0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0,
        ],
      },
      {
        name: 'London',
        data: [
          3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,
        ],
      },
    ]
    this.random = (Math.random() + 1).toString(36).substring(7);

  }
}
