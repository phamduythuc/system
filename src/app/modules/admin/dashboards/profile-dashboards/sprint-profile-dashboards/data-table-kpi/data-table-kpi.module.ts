import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableKpiComponent } from './data-table-kpi.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MaskCurrencyDirective} from './mask-currency.directive'

@NgModule({
  declarations: [
    DataTableKpiComponent,
    MaskCurrencyDirective
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    TranslocoModule,
    SharedModule
  ],
  exports: [
    DataTableKpiComponent,
    MaskCurrencyDirective
  ]
})
export class DataTableKpiModule { }
