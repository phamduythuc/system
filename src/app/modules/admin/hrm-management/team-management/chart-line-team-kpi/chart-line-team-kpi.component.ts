
import { ChangeDetectorRef, Component, Inject, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { TeamService } from '@shared/services/team.service';
import Highcharts from 'highcharts';
import moment from 'moment';

import HC_Exporting from 'highcharts/modules/exporting';
import HC_ExportingOffline from 'highcharts/modules/offline-exporting';
import HC_ExportData from 'highcharts/modules/export-data';
import HC_More from 'highcharts/highcharts-more';

HC_Exporting(Highcharts);
HC_ExportingOffline(Highcharts);
HC_ExportData(Highcharts);
HC_More(Highcharts);




@Component({
  selector: 'app-chart-line-team-kpi',
  templateUrl: './chart-line-team-kpi.component.html',
  styleUrls: ['./chart-line-team-kpi.component.scss']
})
export class ChartLineTeamKpiComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() id: any;
  @Input() searchStartDate: any;
  @Input() searchEndDate: any;

  // hight chart

  highcharts = Highcharts;
  chartOptions: any;
  now: any = moment(new Date(Date.now())).format("01/MM/YYYY");
  start: any = moment(this.now).subtract(5, 'month');

  searchKpi: any = {
    teamId: '',
    startMonth: this.start,
    endMonth: this.now
  }

  chart = {
    xAxits: [],
    cost: [],
    target: [],
    revenue: []
  }
  constructor(
    injector: Injector,
    public teamService: TeamService,
  ) {
    super(injector, teamService, null)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchStartDate) {
      this.searchKpi.startMonth = changes['searchStartDate'].currentValue;
      this.getDataChart(this.searchKpi);
    }
    if (changes.searchEndDate) {
      this.searchKpi.endMonth = changes['searchEndDate'].currentValue;
      this.getDataChart(this.searchKpi);
    }
  }

  ngOnInit(): void {
    this.searchKpi['teamId'] = this.id;
    this.getDataChart(this.searchKpi);
  }

  getDataChart(searchKpi: any) {
    this.teamService.getTeamKpi(searchKpi).subscribe(
      res => {
        if (res.data != null) {
          this.chart.xAxits = res.data.map(x => {
            return x.targetMonth
          });
          this.chart.cost = res.data.map(x => {
            var b = parseInt(x.cost)
            return b;
          })
          this.chart.target = res.data.map(x => {
            var b = parseInt(x.target)
            return b;
          })
          this.chart.revenue = res.data.map(x => {
            var b = parseInt(x.revenue)
            return b;
          })
          this.initChart(this.chart);
        }
      }
    );
  }

  initChart(chart?: any) {
    this.chartOptions = {
      plotOptions: {

      },
      exporting: {
        enabled: true
      },
      chart: {
        type: "line"
      },
      title: {
        text: ""
      },
      subtitle: {
        text: ""
      },
      xAxis: {
        categories: [...chart.xAxits]
      },
      yAxis: {
        title: {
          text: ""
        }
      },
      tooltip: {
        valueSuffix: ""
      },
      series: [
        {
          name: 'Kỳ vọng',
          color: 'green',
          data: [...chart.cost]
        },
        {
          name: 'Chi phí',
          color: 'red',
          data: [...chart.target]
        },
        {
          name: 'Doanh thu',
          color: 'orange',
          data: [...chart.revenue]
        },
      ]
    };
  }
}


