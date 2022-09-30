import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentManagementRoutingModule } from './department-management-routing.module';
import {SharedModule} from "../../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorMessageModule} from "../../../../shared/components/error-message/error-message.module";
import {DepartmentManagementService} from "./department-management.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DepartmentManagementRoutingModule,
      SharedModule,
      FormsModule,
      ErrorMessageModule,
      ReactiveFormsModule
  ]
})
export class DepartmentManagementModule { }
