import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryListComponent } from './salary-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { DataTableModule } from '@layout/common/data-table/data-table.module';



@NgModule({
  declarations: [
    SalaryListComponent
  ],
  imports: [
    CommonModule,
    DataTableModule,
    TranslocoModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SalaryListComponent,
      },
    ]),
  ],
  exports: [SalaryListComponent]
})
export class SalaryListModule { }
