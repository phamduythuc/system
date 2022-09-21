import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LookupTableComponent} from "./lookup-table.component";

const routes: Routes = [
    {
        path: '',
        component: LookupTableComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupTableRoutingModule { }
