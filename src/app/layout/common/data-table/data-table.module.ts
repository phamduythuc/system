import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './data-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SharedModule} from '@shared/shared.module';
import {NumberCustomPipe} from '@shared/directives/number-pipe.pipe';
import {NumberToStringPipe} from '@shared/directives/number-to-string.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    DataTableComponent,
    NumberCustomPipe,
    NumberToStringPipe
  ],
    exports: [
        DataTableComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        SharedModule,
        MatTooltipModule
    ]
})
export class DataTableModule {
}
