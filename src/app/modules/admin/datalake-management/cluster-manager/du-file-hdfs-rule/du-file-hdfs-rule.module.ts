import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuFileHdfsRuleRoutingModule } from './du-file-hdfs-rule-routing.module';
import { DuFileHdfsRuleComponent } from './du-file-hdfs-rule.component';


@NgModule({
  declarations: [
    DuFileHdfsRuleComponent
  ],
  imports: [
    CommonModule,
    DuFileHdfsRuleRoutingModule
  ]
})
export class DuFileHdfsRuleModule { }
