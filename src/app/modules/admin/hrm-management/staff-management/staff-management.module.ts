import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditStaffComponent } from './add-or-edit-staff/add-or-edit-staff.component';
import { DetailsStaffComponent } from './details-staff/details-staff.component';
import {SharedModule} from '@shared/shared.module';
import {StaffManagementRoutingModule} from './staff-management-routing.module';
import { StaffKpiComponent } from './staff-kpi/staff-kpi.component';
import { AddOrEditStaffDrawerComponent } from './add-or-edit-staff-drawer/add-or-edit-staff-drawer.component';



@NgModule({
    declarations: [
        AddOrEditStaffComponent,
        DetailsStaffComponent,
        StaffKpiComponent,
        AddOrEditStaffDrawerComponent
    ],
    exports: [
        AddOrEditStaffDrawerComponent
    ],
    imports: [
        CommonModule,
        StaffManagementRoutingModule,
        SharedModule,
    ]
})
export class StaffManagementModule { }
