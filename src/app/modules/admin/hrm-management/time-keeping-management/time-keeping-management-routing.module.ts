import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarTimeKeepingComponent } from './calendar-time-keeping/calendar-time-keeping.component';
import { TimeKeepingManagementComponent } from './time-keeping-management.component';

const routes: Routes = [
  {path:'', component:TimeKeepingManagementComponent, children:[
    {path:'staff/:id', component:CalendarTimeKeepingComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeKeepingManagementRoutingModule { }
