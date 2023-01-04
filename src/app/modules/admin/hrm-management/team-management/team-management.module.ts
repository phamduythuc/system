import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamManagementRoutingModule } from './team-management-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AddOrEditTeamComponent } from './add-or-edit-team/add-or-edit-team.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HighchartsChartModule } from 'highcharts-angular';
import { HighchartsChartComponent } from 'highcharts-angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TeamItemComponent } from './team-item/team-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { TeamKpiComponent } from './team-kpi/team-kpi.component';
import { ChartLineTeamKpiComponent } from './chart-line-team-kpi/chart-line-team-kpi.component';
import { EditLeaderComponent } from './edit-leader/edit-leader.component';





@NgModule({
  declarations: [
    AddOrEditTeamComponent,
    TeamItemComponent,
    TeamKpiComponent,
    ChartLineTeamKpiComponent,
    EditLeaderComponent,
  ],
  exports: [
    HighchartsChartComponent,
    TeamItemComponent,
  ],
  imports: [
    CommonModule,
    TeamManagementRoutingModule,
    SharedModule,
    NgxMatSelectSearchModule,
    MatStepperModule,
    MatTooltipModule,
    HighchartsChartModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatListModule,
 

  ]
})
export class TeamManagementModule { }
