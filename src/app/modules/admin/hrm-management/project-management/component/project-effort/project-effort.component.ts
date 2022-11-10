import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {ProjectService} from '@shared/services/project.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment, {Moment} from 'moment';
import {CommonUtilsService} from '@shared/common-utils.service';
import {FormArray, FormGroup, Validators} from '@angular/forms';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {EffortService} from '@shared/services/effort.service';
import {forkJoin} from "rxjs";
import {MONTH_FORMAT} from "@shared/app.constant";

@Component({
  selector: 'app-project-effort',
  templateUrl: './project-effort.component.html',
  styleUrls: ['./project-effort.component.scss']
})
export class ProjectEffortComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSDA';

  isLoading: boolean = false;

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'fullName',
      header: 'common.name',
      flex: 0.3,
    },
    {
      columnDef: 'staffCode',
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
              private projectService: ProjectService,
              private effortService: EffortService,
              public dialogRef: MatDialogRef<ProjectEffortComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    super(injector, effortService);
    const month = moment().startOf('month');
    this.formGroup = this.fb.group({
      id: [],
      name: [this.generateName(month)],
      projectId: [data.id],
      startDate: [month],
      estimate: ['', [Validators.required, Validators.pattern('^[0-9][0-9\\.]*$')]],
      effort: ['', [Validators.pattern('^[0-9][0-9\\.]*$')]],
      acceptanceDate: [],
      acceptanceEffort: ['', [Validators.pattern('^[0-9][0-9\\.]*$')]],
      note: [],
      efforts: this.fb.array([])
    });
  }



  ngOnInit(): void {
    this.loadEffortDetail(this.formGroup.get('startDate').value);
  }

  get efforts(): FormArray {
    return this.formGroup.get('efforts') as FormArray;
  }

  loadEffortDetail(month) {
    const searchObj = {projectId: this.data.id, startDate: CommonUtilsService.dateToString(month, false)};
    this.isLoading = true;
    forkJoin([this.effortService.getStage(searchObj), this.effortService.getMembers(searchObj)])
      .subscribe(([res, res1]) => {
        if (this.isSuccess(res1)) {
          res1.data.forEach(item => this.efforts.push(this.newItem(item)));
        }
        this.isLoading = false;
      });
  }

  newItem(data: any): FormGroup {
    return this.fb.group({
      id: [data.id],
      fullName: [data.fullName],
      staffCode: [data.staffCode],
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
    body.startDate = CommonUtilsService.dateToString(body.startDate, false);
    body.acceptanceDate = CommonUtilsService.dateToString(body.acceptanceDate, false);
    this.addOrEdit(body);
    return false;
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
    const month = this.formGroup.get('startDate').value;
    if (month) {
      this.formGroup.patchValue({name: this.generateName(month)});
      this.loadEffortDetail(month);
    }
  }

  generateName(month: Moment): string {
    return `Sprint tháng ${month.format(MONTH_FORMAT)}`;
  }
}
