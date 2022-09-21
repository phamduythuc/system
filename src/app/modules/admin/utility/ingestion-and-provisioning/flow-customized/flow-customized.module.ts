import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowCustomizedRoutingModule } from './flow-customized-routing.module';
import { FlowCustomizedComponent } from './flow-customized.component';


@NgModule({
  declarations: [
    FlowCustomizedComponent
  ],
  imports: [
    CommonModule,
    FlowCustomizedRoutingModule
  ]
})
export class FlowCustomizedModule { }
