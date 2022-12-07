import {Component, Inject, Injector, Input, OnInit, ViewChild} from '@angular/core';
import {StaffService} from '@shared/services/staff.service';
import {BaseComponent} from '@core/base.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment, {Moment} from 'moment';
import {CommonUtilsService} from '@shared/common-utils.service';
import {ChartLineComponent} from '@shared/charts/chart-line/chart-line.component';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-staff-kpi',
  templateUrl: './staff-kpi.component.html',
  styleUrls: ['./staff-kpi.component.scss']
})
export class StaffKpiComponent extends BaseComponent implements OnInit {
  @Input() drawer: any;
  @ViewChild('chartChild')
  chart: ChartLineComponent;

  formGroup = this.fb.group({
    staffId: [],
    startMonth: [moment().add(-7, 'month').startOf('month'),Validators.required],
    endMonth: [moment().add(-1, 'month').endOf('month'),Validators.required]
  });

  options: any = {
    chart: {
      type: 'line'
    },
    title: {
      text: this.translocoService.translate('hrm-management.staff.chartKPI.title')
    },
    yAxis: {
      title: {
        text: 'KPI'
      }
    },
    xAxis: {
      categories: []
    },
    series: [
      {name: 'Thực hiện', color: 'green', data: []},
      {name: 'Target', color: 'red', data: []},
    ],
  };

  constructor(injector: Injector, private staffService: StaffService,
              public dialogRef: MatDialogRef<StaffKpiComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, staffService);
    this.formGroup.patchValue({staffId: data?.id});
  }

  ngOnInit(): void {
    // this.draw();
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

  draw(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const data = this.formGroup.value;
    data.startMonth = CommonUtilsService.dateToString(data.startMonth, false);
    data.endMonth = CommonUtilsService.dateToString(data.endMonth, false);
    this.staffService.getKpiData(data).subscribe(res => {
     if (this.isSuccess(res)) {
       this.options.xAxis.categories = [];
       this.options.series[0].data = [];
       this.options.series[1].data = [];
       res.data.forEach(item => {
         this.options.xAxis.categories.push(item.kpiMonth);
         this.options.series[0].data.push(item.kpiActual);
         this.options.series[1].data.push(item.kpiTarget);
       });
       this.chart.drawChart();
     }
    });
    this.staffService.getKpiData(data).subscribe(res => {
      if ('00' === res.code) {
        this.showSnackBar(res.message, 'success');
        this.close();
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }
  close() {
    this.drawer?.toggle();
  }
}
