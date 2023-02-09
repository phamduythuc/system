import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditStaffComponent } from './add-or-edit-staff/add-or-edit-staff.component';
import { DetailsStaffComponent } from './details-staff/details-staff.component';
import {SharedModule} from '@shared/shared.module';
import {StaffManagementRoutingModule} from './staff-management-routing.module';
import { StaffKpiComponent } from './staff-kpi/staff-kpi.component';
import { AddOrEditStaffDrawerComponent } from './add-or-edit-staff-drawer/add-or-edit-staff-drawer.component';
import { DataTableModule } from '@layout/common/data-table/data-table.module';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormSearchComponent } from './add-or-edit-staff-drawer/form-search/form-search.component';



@NgModule({
    declarations: [
        AddOrEditStaffComponent,
        DetailsStaffComponent,
        StaffKpiComponent,
        AddOrEditStaffDrawerComponent,
        FormSearchComponent
    ],
    exports: [
        AddOrEditStaffDrawerComponent
    ],
    imports: [
        CommonModule,
        DataTableModule,
        StaffManagementRoutingModule,
        TranslocoModule,
        SharedModule,
        NgxMatSelectSearchModule
    ],
})
export class StaffManagementModule { }
