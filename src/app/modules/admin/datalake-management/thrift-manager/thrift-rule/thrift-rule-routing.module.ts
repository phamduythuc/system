import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ThriftRuleComponent} from "./thrift-rule.component";

const routes: Routes = [
    {
        path: '',
        component: ThriftRuleComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThriftRuleRoutingModule { }
