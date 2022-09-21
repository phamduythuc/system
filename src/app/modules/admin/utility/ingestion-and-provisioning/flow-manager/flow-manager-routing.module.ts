import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlowManagerComponent} from "./flow-manager.component";

const routes: Routes = [
    {
        path: '',
        component: FlowManagerComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowManagerRoutingModule { }
