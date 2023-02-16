import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryManagementComponent } from './salary-management.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { DataTableModule } from '@layout/common/data-table/data-table.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SalaryPopupComponent } from './salary-popup/salary-popup.component';

@NgModule({
  declarations: [SalaryManagementComponent, SalaryPopupComponent],
  imports: [
    CommonModule,
    DataTableModule,
    TranslocoModule,
    SharedModule,
    CurrencyMaskModule,
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
  providers: [

    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
  ],
})
export class SalaryManagementModule {}
