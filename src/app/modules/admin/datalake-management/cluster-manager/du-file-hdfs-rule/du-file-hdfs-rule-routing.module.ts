import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DuFileHdfsRuleComponent} from "./du-file-hdfs-rule.component";

const routes: Routes = [
    {
        path: '',
        component: DuFileHdfsRuleComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuFileHdfsRuleRoutingModule { }
