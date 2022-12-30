
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TeamService } from '@shared/services/team.service';
import Highcharts from 'highcharts';


@Component({
  selector: 'app-chart-line-team-kpi',
  templateUrl: './chart-line-team-kpi.component.html',
  styleUrls: ['./chart-line-team-kpi.component.scss']
})
export class ChartLineTeamKpiComponent implements OnInit, OnChanges {
  @Input() id: any;
  
  // hight chart
  highcharts = Highcharts;
  chartOptions: any;

  searchKpi: any = {
    teamId: 5,
    startMonth: '01/01/2021',
    endMonth: '01/12/2021'
  }

  chart = {
    xAxits: [],
    cost: [],
    target:[],
    revenue:[]
  }
  constructor(private cdk: ChangeDetectorRef, public teamService: TeamService,) {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.searchKpi['teamId'] = this.id;
    this.getDataChart(this.searchKpi); 
  }

  getDataChart(searchKpi:any){
    this.teamService.getTeamKpi(searchKpi).subscribe(
      res => {
        this.chart.xAxits = res.data.map(x => {
          return x.targetMonth
        });
        this.chart.cost = res.data.map(x => {
          var b = parseInt(x.cost)
          return b;
        })
        this.chart.target=res.data.map(x=>{
          var b = parseInt(x.target)
          return b;
        })
        this.chart.revenue=res.data.map(x=>{
          var b = parseInt(x.revenue)
          return b;
        })
        this.initChart(this.chart);
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


