import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PositionManagementComponent} from "./position-management.component";

const routes: Routes = [
    {
        path: '',
        component: PositionManagementComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionManagementRoutingModule { }
