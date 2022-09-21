import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlowCustomizedComponent} from "./flow-customized.component";

const routes: Routes = [
    {
        path: '',
        component: FlowCustomizedComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowCustomizedRoutingModule { }
