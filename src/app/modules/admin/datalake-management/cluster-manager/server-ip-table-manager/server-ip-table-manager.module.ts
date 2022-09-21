import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerIpTableManagerRoutingModule } from './server-ip-table-manager-routing.module';
import { ServerIpTableManagerComponent } from './server-ip-table-manager.component';


@NgModule({
  declarations: [
    ServerIpTableManagerComponent
  ],
  imports: [
    CommonModule,
    ServerIpTableManagerRoutingModule
  ]
})
export class ServerIpTableManagerModule { }
