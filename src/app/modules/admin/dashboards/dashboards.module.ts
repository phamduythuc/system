import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import {DashboardsComponent} from './dashboards.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [DashboardsComponent],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    SharedModule
  ]
})
export class DashboardsModule { }
