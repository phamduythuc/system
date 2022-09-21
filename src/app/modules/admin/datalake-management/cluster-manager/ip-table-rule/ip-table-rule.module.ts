import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IpTableRuleRoutingModule } from './ip-table-rule-routing.module';
import { IpTableRuleComponent } from './ip-table-rule.component';


@NgModule({
  declarations: [
    IpTableRuleComponent
  ],
  imports: [
    CommonModule,
    IpTableRuleRoutingModule
  ]
})
export class IpTableRuleModule { }
