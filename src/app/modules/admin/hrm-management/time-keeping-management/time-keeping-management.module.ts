import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeKeepingManagementRoutingModule } from './time-keeping-management-routing.module';
import { TimeKeepingManagementComponent } from './time-keeping-management.component';
import { ListStaffComponent } from './list-staff/list-staff.component';
import { CalendarTimeKeepingComponent } from './calendar-time-keeping/calendar-time-keeping.component';
import { SharedModule } from '@shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    TimeKeepingManagementComponent,
    ListStaffComponent,
    CalendarTimeKeepingComponent
  ],
  imports: [
    CommonModule,
    TimeKeepingManagementRoutingModule,
    SharedModule,
    FullCalendarModule
  ]
})
export class TimeKeepingManagementModule { }
