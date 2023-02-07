import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionManagementRoutingModule } from './position-management-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorMessageModule} from '../../../../shared/components/error-message/error-message.module';
import { AddOrEditPositionComponent } from './compoment/add-or-edit-position/add-or-edit-position.component';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import { DetailPositionComponent } from './compoment/detail-position/detail-position.component';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AddOrEditPositionComponent,
    DetailPositionComponent
  ],
    imports: [
        CommonModule,
        PositionManagementRoutingModule,
        SharedModule,
        FormsModule,
        ErrorMessageModule,
        ReactiveFormsModule,
        NgxTrimDirectiveModule,
        MatTooltipModule
    ],
})
export class PositionManagementModule { }