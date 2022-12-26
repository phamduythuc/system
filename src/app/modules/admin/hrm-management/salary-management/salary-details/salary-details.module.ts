import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryDetailsComponent } from './salary-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SalaryDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SalaryDetailsComponent,
      },
    ]),
  ],
  exports: [SalaryDetailsComponent],
})
export class SalaryDetailsModule {}
