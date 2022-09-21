import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessManagerRoutingModule } from './process-manager-routing.module';
import { ProcessManagerComponent } from './process-manager.component';


@NgModule({
  declarations: [
    ProcessManagerComponent
  ],
  imports: [
    CommonModule,
    ProcessManagerRoutingModule
  ]
})
export class ProcessManagerModule { }
