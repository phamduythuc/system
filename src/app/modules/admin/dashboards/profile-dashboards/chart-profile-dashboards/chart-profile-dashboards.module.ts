import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartProfileDashboardsComponent } from './chart-profile-dashboards.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ChartProfileDashboardsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ChartProfileDashboardsComponent]
})
export class ChartProfileDashboardsModule { }
