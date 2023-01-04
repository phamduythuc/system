
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

import highcharts3D from 'highcharts/highcharts-3d.src';

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


  searchKpi: any = {
    teamId: '',
    startMonth: '',
    endMonth: ''
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
    super(injector, teamService, null);
    this.initChart(this.chart);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchStartDate && changes.searchStartDate.currentValue != undefined) {
      this.searchKpi.startMonth = changes['searchStartDate'].currentValue;
      this.getDataChart(this.searchKpi);
    }
    if (changes.searchEndDate && changes.searchEndDate.currentValue != undefined) {
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
            if (x.cost == null) {
              x.cost = 0
            }
            var b = parseInt(x.cost)
            return b;
          })
          this.chart.target = res.data.map(x => {
            if (x.target == null) {
              x.target = 0
            }
            var b = parseInt(x.target)
            return b;
          })
          this.chart.revenue = res.data.map(x => {
            if (x.revenue == null) {
              x.revenue = 0
            }
            var b = parseInt(x.revenue)
            return b;
          })
          this.initChart(this.chart);
        }
      }
    );
  }

  chartCallback: Highcharts.ChartCallbackFunction = function (chart): void {
    setTimeout(() => {
      chart.reflow();
      // chart.redraw();
    }, 0);
  };

  initChart(chart?: any) {
    this.chartOptions = {

      accessibility:{
        enabled: false
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            lineColor: null
          },
          lineWidth: 2,
          states: {
            inactive: {
              enabled: false,
            },
          },
        },
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


