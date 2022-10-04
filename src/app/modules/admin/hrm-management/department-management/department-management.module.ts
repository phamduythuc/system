import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentManagementRoutingModule } from './department-management-routing.module';
import {SharedModule} from "../../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorMessageModule} from "../../../../shared/components/error-message/error-message.module";
import { AddOrEditDepartmentComponent } from './add-or-edit-department/add-or-edit-department.component';
import {NgxTrimDirectiveModule} from "ngx-trim-directive";


@NgModule({
  declarations: [
    AddOrEditDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentManagementRoutingModule,
    SharedModule,
    FormsModule,
    ErrorMessageModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule
  ]
})
export class DepartmentManagementModule { }
