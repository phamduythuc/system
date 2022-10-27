import {Component, Inject, Injector, OnInit} from '@angular/core';
import {StaffManagementService} from "../staff-management.service";
import {BaseComponent} from "@core/base.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-staff-kpi',
  templateUrl: './staff-kpi.component.html',
  styleUrls: ['./staff-kpi.component.scss']
})
export class StaffKpiComponent extends BaseComponent implements OnInit {

  formGroup =this.fb.group({
    startMonth:[],
    endMonth:[]
  })

  constructor(injector: Injector, private staffService: StaffManagementService,public dialogRef: MatDialogRef<StaffKpiComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector,staffService)
  }

  ngOnInit(): void {

  }

  save(value: any) {
    return false;
  }
}
