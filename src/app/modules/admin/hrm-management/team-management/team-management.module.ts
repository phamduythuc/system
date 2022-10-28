import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMembersComponent } from './team-members/team-members.component';
import {TeamManagementRoutingModule} from "./team-management-routing.module";
import {SharedModule} from "@shared/shared.module";
import { AddOrEditTeamComponent } from './add-or-edit-team/add-or-edit-team.component';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    TeamMembersComponent,
    AddOrEditTeamComponent
  ],
  exports: [
    TeamMembersComponent
  ],
    imports: [
        CommonModule,
        TeamManagementRoutingModule,
        SharedModule,
        NgxMatSelectSearchModule,
        MatStepperModule,
        MatTooltipModule
    ]
})
export class TeamManagementModule { }
