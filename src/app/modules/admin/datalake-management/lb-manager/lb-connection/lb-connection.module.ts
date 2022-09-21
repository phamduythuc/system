import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LbConnectionRoutingModule } from './lb-connection-routing.module';
import { LbConnectionComponent } from './lb-connection.component';


@NgModule({
  declarations: [
    LbConnectionComponent
  ],
  imports: [
    CommonModule,
    LbConnectionRoutingModule
  ]
})
export class LbConnectionModule { }
