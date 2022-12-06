import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './data-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SharedModule} from '@shared/shared.module';
import {NumberCustomPipe} from '@shared/directives/number-pipe.pipe';


@NgModule({
  declarations: [
    DataTableComponent,
    NumberCustomPipe
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
        SharedModule
    ]
})
export class DataTableModule {
}
