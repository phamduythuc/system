import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IpTableRuleComponent} from "./ip-table-rule.component";

const routes: Routes = [
    {
        path: '',
        component: IpTableRuleComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpTableRuleRoutingModule { }
