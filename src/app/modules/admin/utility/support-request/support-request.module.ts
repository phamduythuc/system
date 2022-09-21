import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRequestRoutingModule } from './support-request-routing.module';
import { SupportRequestComponent } from './support-request.component';


@NgModule({
  declarations: [
    SupportRequestComponent
  ],
  imports: [
    CommonModule,
    SupportRequestRoutingModule
  ]
})
export class SupportRequestModule { }
