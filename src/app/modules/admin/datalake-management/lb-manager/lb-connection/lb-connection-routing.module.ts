import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LbConnectionComponent} from "./lb-connection.component";

const routes: Routes = [
    {
        path: '',
        component: LbConnectionComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LbConnectionRoutingModule { }
