import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintProfileDashboardsComponent } from './sprint-profile-dashboards.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '@shared/shared.module';
import { DataTableModule } from '@layout/common/data-table/data-table.module';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    SprintProfileDashboardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslocoModule,
    DataTableModule,
    MatTooltipModule
  ],
  exports: [SprintProfileDashboardsComponent]
})
export class SprintProfileDashboardsModule { }
