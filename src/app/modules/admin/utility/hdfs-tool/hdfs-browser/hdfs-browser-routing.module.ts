import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HdfsBrowserComponent} from "./hdfs-browser.component";

const routes: Routes = [
    {
        path: '',
        component: HdfsBrowserComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HdfsBrowserRoutingModule { }
