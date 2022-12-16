import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractProfileDashboardsComponent } from './contract-profile-dashboards.component';
import { DataTableModule } from '@layout/common/data-table/data-table.module';
import { TranslocoModule } from '@ngneat/transloco';
import { DataTableKpiModule } from '../sprint-profile-dashboards/data-table-kpi/data-table-kpi.module';


@NgModule({
  declarations: [
    ContractProfileDashboardsComponent
  ],
  imports: [
    CommonModule,
    DataTableModule,
    TranslocoModule,
    DataTableKpiModule
  ],
  exports: [ContractProfileDashboardsComponent]
})
export class ContractProfileDashboardsModule { }
