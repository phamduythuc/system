import { Component, Inject, Injector, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { ChartLineComponent } from '@shared/charts/chart-line/chart-line.component';
import { TeamService } from '@shared/services/team.service';
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

  expected: any[] = [];

  constructor(injector: Injector, public teamService: TeamService,
  ) {
    super(injector)
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {

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
