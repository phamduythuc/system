import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ThriftAccessRuleComponent} from "./thrift-access-rule.component";

const routes: Routes = [
    {
        path: '',
        component: ThriftAccessRuleComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThriftAccessRuleRoutingModule { }
