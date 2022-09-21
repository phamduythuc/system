import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HdfsBrowserRoutingModule } from './hdfs-browser-routing.module';
import { HdfsBrowserComponent } from './hdfs-browser.component';


@NgModule({
  declarations: [
    HdfsBrowserComponent
  ],
  imports: [
    CommonModule,
    HdfsBrowserRoutingModule
  ]
})
export class HdfsBrowserModule { }
