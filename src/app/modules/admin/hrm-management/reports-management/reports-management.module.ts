import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsManagementComponent } from './reports-management.component';
import { RouterModule } from '@angular/router';
import { DetailReportsComponent } from './detail-reports/detail-reports.component';
import { SharedModule } from '@shared/shared.module';
import { DataTableModule } from '@layout/common/data-table/data-table.module';
import { AddOrEditReportsComponent } from './add-or-edit-reports/add-or-edit-reports.component';



@NgModule({
  declarations: [
    ReportsManagementComponent,
    DetailReportsComponent,
    AddOrEditReportsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportsManagementComponent,
      },
    ]),
  ],
  exports: [ReportsManagementComponent]
})
export class ReportsManagementModule { }
