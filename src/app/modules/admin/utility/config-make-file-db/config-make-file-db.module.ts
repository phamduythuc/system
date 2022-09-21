import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigMakeFileDbRoutingModule } from './config-make-file-db-routing.module';
import { ConfigMakeFileDbComponent } from './config-make-file-db.component';


@NgModule({
  declarations: [
    ConfigMakeFileDbComponent
  ],
  imports: [
    CommonModule,
    ConfigMakeFileDbRoutingModule
  ]
})
export class ConfigMakeFileDbModule { }
