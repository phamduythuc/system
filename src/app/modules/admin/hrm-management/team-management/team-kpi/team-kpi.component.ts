import { Component, Inject, Injector, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { ChartLineComponent } from '@shared/charts/chart-line/chart-line.component';
import { TeamService } from '@shared/services/team.service';
import moment from 'moment';
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
  formSearchKpi = this.fb.group({
    teamId: [],
    startMonth: [],
    endMonth: []
  });
  searchEndDate: any = moment(new Date(Date.now())).format("01/MM/YYYY");
  searchStartDate: any= moment(new Date(Date.now())).subtract(5,'month').format("01/MM/YYYY");
  constructor(injector: Injector, public teamService: TeamService,) {
    super(injector, teamService);
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.EndTimeFormat = moment(new Date(Date.now())).format("YYYY-MM-DDT00:00:00Z");
    this.StartTimeFormat = moment(this.EndTimeFormat).subtract(5, 'month');
    this.formSearchKpi.setValue({
      teamId: [this.data],
      startMonth: this.StartTimeFormat,
      endMonth: this.EndTimeFormat
    });
  }

  onDateChange(type: string, date: any) {
    if (type === 'startDate') {
      this.searchStartDate = moment(date).format("01/MM/YYYY");
    }
    else {
      this.searchEndDate = moment(date).format("01/MM/YYYY");
    }
  }

  zoomChart() {
    this.showDialog(ChartLineTeamKpiComponent, {
      data: this.formSearchKpi
    })
  }

}
