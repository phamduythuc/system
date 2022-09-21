import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RpAppRoutingModule } from './rp-app-routing.module';
import { RpAppComponent } from './rp-app.component';


@NgModule({
  declarations: [
    RpAppComponent
  ],
  imports: [
    CommonModule,
    RpAppRoutingModule
  ]
})
export class RpAppModule { }
