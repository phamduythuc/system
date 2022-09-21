import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionManagerRoutingModule } from './connection-manager-routing.module';
import { ConnectionManagerComponent } from './connection-manager.component';


@NgModule({
  declarations: [
    ConnectionManagerComponent
  ],
  imports: [
    CommonModule,
    ConnectionManagerRoutingModule
  ]
})
export class ConnectionManagerModule { }
