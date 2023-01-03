
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TeamService } from '@shared/services/team.service';
import Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d.src';
import moment from 'moment';



@Component({
  selector: 'app-chart-line-team-kpi',
  templateUrl: './chart-line-team-kpi.component.html',
  styleUrls: ['./chart-line-team-kpi.component.scss']
})
export class ChartLineTeamKpiComponent implements OnInit, OnChanges {
  @Input() id: any;
  @Input() searchStartDate: any ;
  @Input() searchEndDate: any;

  // hight chart

  highcharts = Highcharts;
  chartOptions: any;
  now : any = moment(new Date(Date.now())).format("01/MM/YYYY");
  start : any =  moment(this.now).subtract(5, 'month');

  searchKpi: any = {
    teamId: '',
    startMonth: this.start,
    endMonth:this.now
  }

  chart = {
    xAxits: [],
    cost: [],
    target: [],
    revenue: []
  }
  constructor(private cdk: ChangeDetectorRef, public teamService: TeamService,) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes.searchStartDate) {
      this.searchKpi.startMonth = changes['searchStartDate'].currentValue;
      this.getDataChart(this.searchKpi);
      debugger

    }
    if (changes.searchEndDate) {
      this.searchKpi.endMonth = changes['searchEndDate'].currentValue;
      this.getDataChart(this.searchKpi);
      debugger

    }
  }

  ngOnInit(): void {
    this.searchKpi['teamId'] = this.id;
    this.getDataChart(this.searchKpi);
  }

  getDataChart(searchKpi: any) {
    this.teamService.getTeamKpi(searchKpi).subscribe(
      res => {
        if(res.data!=null){
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

  initChart(chart: any) {
    this.chartOptions = {
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


