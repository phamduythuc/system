import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryManagementComponent } from './salary-management.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { DataTableModule } from '@layout/common/data-table/data-table.module';
import { DataTableKpiModule } from '../../dashboards/profile-dashboards/sprint-profile-dashboards/data-table-kpi/data-table-kpi.module';

@NgModule({
  declarations: [SalaryManagementComponent],
  imports: [
    CommonModule,
    DataTableModule,
    TranslocoModule,
    SharedModule,
    DataTableKpiModule,
    RouterModule.forChild([
      {
        path: '',
        component: SalaryManagementComponent,
        // children: [
        //   {
        //     path: '',
        //     loadChildren: () =>
        //       import('./salary-list/salary-list.module').then(
        //         (m) => m.SalaryListModule
        //       ),
        //   },
        //   {
        //     path: 'details/:id',
        //     loadChildren: () =>
        //       import('./salary-details/salary-details.module').then(
        //         (m) => m.SalaryDetailsModule
        //       ),
        //   },
        // ],
      },
    ]),
  ],
  exports: [SalaryManagementComponent],
})
export class SalaryManagementModule {}
