import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServerIpTableManagerComponent} from "./server-ip-table-manager.component";

const routes: Routes = [
    {
        path: '',
        component: ServerIpTableManagerComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerIpTableManagerRoutingModule { }
