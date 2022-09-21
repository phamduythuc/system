import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupTableRoutingModule } from './lookup-table-routing.module';
import { LookupTableComponent } from './lookup-table.component';


@NgModule({
  declarations: [
    LookupTableComponent
  ],
  imports: [
    CommonModule,
    LookupTableRoutingModule
  ]
})
export class LookupTableModule { }
