import { Component, Inject, Injector, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { BaseComponent } from '@core/base.component';
import { ChartLineComponent } from '@shared/charts/chart-line/chart-line.component';
import { TeamService } from '@shared/services/team.service';
import { creatDateRangeValidator } from '@shared/validation/date-picker.validation';
import moment, { Moment } from 'moment';
import { ChartLineTeamKpiComponent } from '../chart-line-team-kpi/chart-line-team-kpi.component';

@Component({
  selector: 'app-team-kpi',
  templateUrl: './team-kpi.component.html',
  styleUrls: ['./team-kpi.component.scss']
})
export class TeamKpiComponent extends BaseComponent implements OnInit {
  @Input() data: any;
  @Input() op: any;
  @Input() random: any;

  @ViewChild('chartChild')
  chart: ChartLineComponent;
  EndTimeFormat: any;
  StartTimeFormat: any;
  expected: any[] = [];
  date = new FormControl(moment());
  searchEndDate: any = moment(new Date(Date.now())).format("01/MM/YYYY");
  searchStartDate: any = moment(new Date(Date.now())).subtract(5, 'month').format("01/MM/YYYY");
  endDates:any = moment;
  formSearchKpi = this.fb.group({
    teamId: [],
    startMonth: [], 
    endMonth: []
  },{validators: [creatDateRangeValidator()]});
  constructor(injector: Injector, public teamService: TeamService,) {
    super(injector, teamService);
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.EndTimeFormat = moment(new Date(Date.now()));
    // this.EndTimeFormat=this.date
    this.StartTimeFormat = moment(this.EndTimeFormat).subtract(5, 'month');
    this.formSearchKpi.setValue({
      teamId: [this.data],
      startMonth: this.StartTimeFormat,
      endMonth: this.EndTimeFormat
    });
  }
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>, type?: string) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    if (type === 'startDate') {
      this.searchStartDate = moment(ctrlValue).format("01/MM/YYYY");
      this.formSearchKpi.patchValue({
        startMonth: moment(ctrlValue),
      });     
    }
    else {
      this.formSearchKpi.patchValue({
        endMonth: moment(ctrlValue),
      });
      this.searchEndDate = moment(ctrlValue).format("01/MM/YYYY");
    }
    datepicker.close();
  }

  onDateChange(type: string, date: any) {
    // if (type === 'startDate') {
    //   this.searchStartDate = moment(date).format("01/MM/YYYY");
    // }
    // else {
    //   this.searchEndDate = moment(date).format("01/MM/YYYY");
    // }
  }

  zoomChart() {
    this.showDialog(ChartLineTeamKpiComponent, {
      data: this.formSearchKpi
    })
  }

}


