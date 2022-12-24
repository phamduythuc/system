import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintProfileDashboardsComponent } from './sprint-profile-dashboards.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '@shared/shared.module';
import { DataTableModule } from '@layout/common/data-table/data-table.module';
import { DataTableKpiModule } from './data-table-kpi/data-table-kpi.module';



@NgModule({
  declarations: [
    SprintProfileDashboardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataTableKpiModule,
    TranslocoModule
  ],
  exports: [SprintProfileDashboardsComponent]
})
export class SprintProfileDashboardsModule { }
