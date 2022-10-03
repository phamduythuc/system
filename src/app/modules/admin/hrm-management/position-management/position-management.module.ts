import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionManagementRoutingModule } from './position-management-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorMessageModule} from '../../../../shared/components/error-message/error-message.module';
import { AddOrEditPositionComponent } from './compoment/add-or-edit-position/add-or-edit-position.component';


@NgModule({
  declarations: [
    AddOrEditPositionComponent
  ],
  imports: [
    CommonModule,
    PositionManagementRoutingModule,
      SharedModule,
      FormsModule,
      ErrorMessageModule,
      ReactiveFormsModule
  ],
})
export class PositionManagementModule { }
