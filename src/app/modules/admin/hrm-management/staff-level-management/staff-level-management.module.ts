import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddOrEditStaffLevelComponent} from "./compoment/add-or-edit-staff-level/add-or-edit-staff-level.component";
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorMessageModule} from "@shared/components/error-message/error-message.module";
import {StaffLevelManagementRoutingModule} from "./staff-level-management-routing.module";



@NgModule({
  declarations: [AddOrEditStaffLevelComponent],
  imports: [
    CommonModule,
    StaffLevelManagementRoutingModule,
    SharedModule,
    FormsModule,
    ErrorMessageModule,
    ReactiveFormsModule
  ]
})
export class StaffLevelManagementModule { }
