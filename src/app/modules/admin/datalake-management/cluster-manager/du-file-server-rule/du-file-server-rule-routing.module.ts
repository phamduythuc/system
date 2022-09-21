import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DuFileServerRuleComponent} from "./du-file-server-rule.component";

const routes: Routes = [
    {
        path: '',
        component: DuFileServerRuleComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuFileServerRuleRoutingModule { }
