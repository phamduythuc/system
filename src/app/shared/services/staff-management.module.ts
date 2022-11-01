import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditStaffComponent } from '../../modules/admin/hrm-management/staff-management/add-or-edit-staff/add-or-edit-staff.component';
import { DetailsStaffComponent } from '../../modules/admin/hrm-management/staff-management/details-staff/details-staff.component';
import {SharedModule} from '@shared/shared.module';
import {StaffManagementRoutingModule} from '../../modules/admin/hrm-management/staff-management/staff-management-routing.module';
import { StaffKpiComponent } from '../../modules/admin/hrm-management/staff-management/staff-kpi/staff-kpi.component';



@NgModule({
  declarations: [
    AddOrEditStaffComponent,
    DetailsStaffComponent,
    StaffKpiComponent
  ],
  imports: [
    CommonModule,
    StaffManagementRoutingModule,
    SharedModule,
  ]
})
export class StaffManagementModule { }
