import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuFileServerRuleRoutingModule } from './du-file-server-rule-routing.module';
import { DuFileServerRuleComponent } from './du-file-server-rule.component';


@NgModule({
  declarations: [
    DuFileServerRuleComponent
  ],
  imports: [
    CommonModule,
    DuFileServerRuleRoutingModule
  ]
})
export class DuFileServerRuleModule { }
