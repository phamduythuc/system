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

@Component({
  selector: 'app-project-effort',
  templateUrl: './project-effort.component.html',
  styleUrls: ['./project-effort.component.scss']
})
export class ProjectEffortComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSDA';

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

  formGroup: FormGroup;
  formArray: FormArray;
  a = [1, 2, 3, 4];

  constructor(injector: Injector,
              private projectService: ProjectService,
              private effortService: EffortService,
              public dialogRef: MatDialogRef<ProjectEffortComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    super(injector, projectService);
    const month = moment().startOf('month');
    this.formArray = this.fb.array([]);
    this.formGroup = this.fb.group({
      projectId: [data.id],
      startMonth: [month],
      estimate: [],
      effort: [],
      acceptanceDate: [],
      acceptanceEffort: [],
      note: [],
      arr: this.fb.array([])
    });
  }



  ngOnInit(): void {
    this.loadEffortDetail(this.formGroup.get('startMonth').value);
  }

  get arr(): FormArray {
    // return this.formGroup.get('arr') as FormArray;
    return this.formArray;
  }

  loadEffortDetail(month) {
    const searchObj = {projectId: this.data.id, startMonth: CommonUtilsService.dateToString(month, false)};
    this.effortService.getMembers(searchObj).subscribe(res => {
      const formArray = [];
      if (this.isSuccess(res)) {
        res.data.forEach(item => formArray.push(this.newItem(item)));
        this.formArray = this.fb.array(formArray);
      }
    });
  }

  newItem(data: any): FormGroup {
    return this.fb.group({
      id: [data.id],
      fullName: [data.fullName],
      staffCode: [data.staffCode],
      effort: [data.effort],
      percentEffort: [data.percentEffort],
    });
  }

  removeArr(i: number) {
    this.arr.removeAt(i);
  }

  addArr(data: any) {
    this.arr.push(this.newItem(data));
  }

  save(value: any) {
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
}
