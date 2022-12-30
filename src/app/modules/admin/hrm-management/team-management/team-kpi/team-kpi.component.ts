import { Component, Inject, Injector, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { ChartLineComponent } from '@shared/charts/chart-line/chart-line.component';
import { TeamService } from '@shared/services/team.service';
import * as Highcharts from 'highcharts';
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
  searchKpi: any = {
    teamId: 5,
    startMonth: '01/01/2021',
    endMonth: '01/12/2021'
  }


  // hight chart
  highcharts = Highcharts;
  chartKpiTeam: any = {
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
      categories: []
    },
    yAxis: {
      title: {
        text: ""
      }
    },
    tooltip: {
      valueSuffix: "$"
    },
    series: [
      {
        name: 'Kỳ vọng',
        color: 'green',
        data: [1, 2, 3]
      },
      {
        name: 'Chi phí',
        color: 'red',
        data: [4, 5, 6]
      },
      {
        name: 'Doanh thu',
        color: 'orange',
        data: [1, 2, 7]
      },
    ]
  };

  options: any;
  months  = [];
  monthss=[1,2,3]

  expected: any[] = [];

  constructor(injector: Injector, public teamService: TeamService,
  ) {
    super(injector)
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.searchKpi['teamId'] = this.data;
    this.teamService.getTeamKpi(this.searchKpi).subscribe(res => {
      const a = res.data.map(item => {
        return item.targetMonth
      }
      );
      this.chartKpiTeam.xAxis.categories = [...a]
    });
  }

  zoomChart() {
    this.showDialog(ChartLineTeamKpiComponent, {
      data: {
      },
      width: '70vw',
      maxHeight: '90vh',
      disableClose: false
    }, (value) => {
      if (value) {
        // this.doSearch();
      }
    });
  }

}
