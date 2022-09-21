import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowManagerRoutingModule } from './flow-manager-routing.module';
import { FlowManagerComponent } from './flow-manager.component';


@NgModule({
  declarations: [
    FlowManagerComponent
  ],
  imports: [
    CommonModule,
    FlowManagerRoutingModule
  ]
})
export class FlowManagerModule { }
