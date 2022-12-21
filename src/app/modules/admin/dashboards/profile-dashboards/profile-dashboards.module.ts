import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDashboardsComponent } from './profile-dashboards.component';
import { ProfileDashboardsRoutingModule } from './profile-dashboards-routing.module';
import { DetailProfileDashboardsModule } from './detail-profile-dashboards/detail-profile-dashboards.module';
import { ContractProfileDashboardsModule } from './contract-profile-dashboards/contract-profile-dashboards.module';
import { MatIconModule } from '@angular/material/icon';
import { ChartProfileDashboardsModule } from './chart-profile-dashboards/chart-profile-dashboards.module';
import { SprintProfileDashboardsModule } from './sprint-profile-dashboards/sprint-profile-dashboards.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '@shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    ProfileDashboardsComponent,
  ],
  imports: [
    CommonModule,
    ProfileDashboardsRoutingModule,
    DetailProfileDashboardsModule,
    ContractProfileDashboardsModule,
    MatIconModule,
    TranslocoModule,
    ChartProfileDashboardsModule,
    SprintProfileDashboardsModule,
    SharedModule,
    MatExpansionModule
  ]
})
export class ProfileDashboardsModule { }
