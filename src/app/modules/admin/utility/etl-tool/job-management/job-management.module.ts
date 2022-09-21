import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobManagementRoutingModule } from './job-management-routing.module';
import { JobManagementComponent } from './job-management.component';


@NgModule({
  declarations: [
    JobManagementComponent
  ],
  imports: [
    CommonModule,
    JobManagementRoutingModule
  ]
})
export class JobManagementModule { }
