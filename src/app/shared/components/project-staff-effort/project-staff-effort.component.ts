import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {ProjectService} from '@shared/services/project.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment, {Moment} from 'moment';
import {CommonUtilsService} from '@shared/common-utils.service';
import {FormArray, FormGroup, Validators} from '@angular/forms';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {EffortService} from '@shared/services/effort.service';
import {MONTH_FORMAT} from '@shared/app.constant';
import {AuthService} from '@core/auth/auth.service';

@Component({
  selector: 'app-project-effort',
  templateUrl: './project-staff-effort.component.html',
  styleUrls: ['./project-staff-effort.component.scss']
})
export class ProjectStaffEffortComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSDA';

  isLoading: boolean = false;

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'projectName',
      header: 'common.name',
      flex: 0.3,
    },
    {
      columnDef: 'projectCode',
      header: 'common.code',
      flex: 0.3,
    },
    {
      columnDef: 'effort',
      header: 'effort.acknowledgment_of_effort',
    },
    {
      columnDef: 'percentEffort',
      header: 'effort.percent_effort',
      cellRenderer: (row) => (row.percentEffort || 0) + '%'
    },
    // {
    //   columnDef: 'action',
    //   header: 'common.actions',
    //   actions: [ 'view','edit', 'delete'],
    // }
  ];

  constructor(injector: Injector,
              private authService: AuthService,
              private projectService: ProjectService,
              private effortService: EffortService,
              public dialogRef: MatDialogRef<ProjectStaffEffortComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    super(injector, effortService);
    const month = moment().startOf('month');
    this.formGroup = this.fb.group({
      startMonth: [month],
      projectEfforts: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadEffortDetail(this.formGroup.get('startMonth').value);
  }

  get efforts(): FormArray {
    return this.formGroup.get('projectEfforts') as FormArray;
  }

  loadEffortDetail(month) {
    const monthStr = CommonUtilsService.dateToString(month, false);
    const monthTimeStr = CommonUtilsService.dateToString(month, true, true);
    const searchObj = {monthUTC: monthTimeStr, month: monthStr};
    this.isLoading = true;
    this.efforts.clear();
    this.effortService.getListProject(searchObj).subscribe(res => {
      if (this.isSuccess(res)) {
        res.data.forEach(item => this.efforts.push(this.newItem(item)));
        this.isLoading = false;
      }
    });
  }

  newItem(data: any): FormGroup {
    return this.fb.group({
      projectId: [data.projectId],
      projectName: [data.projectName],
      projectCode: [data.projectCode],
      effortId: [data.effortId],
      effort: [data.effort, [Validators.pattern('^[0-9][0-9\\.]*$')]],
      percentEffort: [data.percentEffort],
    });
  }

  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const body = this.formGroup.value;
    body.monthUTC = CommonUtilsService.dateToString(body.startMonth, true, true);
    body.month = CommonUtilsService.dateToString(body.startMonth, false);
    this.effortService.updatePercentEffort(body).subscribe(res => {
      if (this.isSuccess(res)) {
        this.showSnackBar('Cập nhật thành công', 'success');
      }
    });
  }

  chosenYearHandler(normalizedYear: Moment, formTarget): void {
    const ctrlValue = formTarget.value;
    ctrlValue.year(normalizedYear.year());
    formTarget.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: any, formTarget): void {
    datepicker.close();
    const ctrlValue = formTarget.value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.date('1');
    formTarget.setValue(ctrlValue);
  }

  dateFilter: (date: (Date | null)) => boolean =
    (date: Date | null) => {
      const day = date.getDay();
      return day !== 0 && day !== 6;
      //0 means sunday
      //6 means saturday
    };

  actionClick(e: any): void {
    if (e.type === 'edit') {
      this.addOrEdit(e.data.id);
    }

    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id);
    }
  }

  changeMonth() {
    this.formGroup.patchValue({arr: this.fb.array([])});
    const month = moment(this.formGroup.get('startMonth').value);
    if (month) {
      this.formGroup.patchValue({name: this.generateName(month)});
      this.loadEffortDetail(month);
    }
  }

  generateName(month: any): string {
    return `Sprint tháng ${month.format(MONTH_FORMAT)}`;
  }
}
