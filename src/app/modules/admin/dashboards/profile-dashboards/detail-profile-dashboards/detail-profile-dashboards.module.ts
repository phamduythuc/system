import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailProfileDashboardsComponent } from './detail-profile-dashboards.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    DetailProfileDashboardsComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    SharedModule
  ],
  exports: [DetailProfileDashboardsComponent]
})
export class DetailProfileDashboardsModule { }
