import {Component, Inject, Injector, OnInit} from '@angular/core';
import {StaffManagementService} from "../staff-management.service";
import {BaseComponent} from "@core/base.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import moment, {Moment} from "moment";
import {FormControl} from "@angular/forms";
import {MatDatepicker} from "@angular/material/datepicker";
import {CommonUtilsService} from "@shared/common-utils.service";

@Component({
  selector: 'app-staff-kpi',
  templateUrl: './staff-kpi.component.html',
  styleUrls: ['./staff-kpi.component.scss']
})
export class StaffKpiComponent extends BaseComponent implements OnInit {
  staffId
  date = new FormControl(moment());
  formGroup = this.fb.group({
    startMonth: [moment()],
    endMonth: [moment()]
  })

  constructor(injector: Injector, private staffService: StaffManagementService,
              public dialogRef: MatDialogRef<StaffKpiComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, staffService);
    this.staffId = data?.id
  }

  ngOnInit(): void {

  }

  save(value: any) {
    return false;
  }

  chosenYearHandler(normalizedYear: Moment, formTarget) {
    const ctrlValue = formTarget.value;
    ctrlValue.year(normalizedYear.year());
    formTarget.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: any, formTarget) {
    const ctrlValue = formTarget.value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.date('1')
    formTarget.setValue(ctrlValue);
    console.log(CommonUtilsService.dateToString(formTarget.value))
    datepicker.close();
  }

  draw(value: any) {
    const data = {
      startMonth: value.startMonth,
      endMonth: value.endMonth,
      staffId: this.staffId
    }

  }
}
