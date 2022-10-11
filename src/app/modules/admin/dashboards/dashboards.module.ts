import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import {DashboardsComponent} from "./dashboards.component";
import { ChartComponent } from './chart/chart.component';
import {HighchartsChartModule} from "highcharts-angular";
import {MatCardModule} from "@angular/material/card";
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [DashboardsComponent, ChartComponent],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    HighchartsChartModule,
    MatCardModule,
    SharedModule
  ]
})
export class DashboardsModule { }
