import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import {DashboardsComponent} from './dashboards.component';
import {SharedModule} from '@shared/shared.module';
import {TranslocoModule} from '@ngneat/transloco';
import {ProjectStaffEffortModule} from '@shared/components/project-staff-effort/project-staff-effort.module';
import { ProfileDashboardsModule } from './profile-dashboards/profile-dashboards.module';


@NgModule({
  declarations: [DashboardsComponent],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    SharedModule,
    TranslocoModule,
    ProjectStaffEffortModule,
    ProfileDashboardsModule
  ]
})
export class DashboardsModule { }
