import { Component, Inject, Injector, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { ChartLineComponent } from '@shared/charts/chart-line/chart-line.component';
import { TeamService } from '@shared/services/team.service';
import moment from 'moment';

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
  searchStartDate:any;
  searchEndDate:any;

  constructor(injector: Injector, public teamService: TeamService,) {
    super(injector);
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.EndTimeFormat = moment(new Date(Date.now())).format("YYYY-MM-DDTHH:MM:SSZ");
    this.StartTimeFormat = moment(this.EndTimeFormat).subtract(5, 'month');
    this.formSearchKpi.setValue({
      teamId: [this.data],
      startMonth: this.StartTimeFormat,
      endMonth: this.EndTimeFormat
    });
  }

  onDateChange(type:string,date: any) {
    if(type==='startDate'){
      this.searchStartDate = moment(date).format("01/MM/YYYY");    
    }
    else{
      this.searchEndDate = moment(date).format("01/MM/YYYY");    
    }
  }

  zoomChart() {

  }

}
