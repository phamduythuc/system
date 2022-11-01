import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {ProjectManagementService} from '@shared/services/project-management.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment, {Moment} from 'moment';
import {CommonUtilsService} from '@shared/common-utils.service';
import {FormArray, FormGroup} from '@angular/forms';
import {IColumn} from '@layout/common/data-table/data-table.component';

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
      columnDef: 'name',
      header: 'common.name',
      flex: 0.3,
    },
    {
      columnDef: 'code',
      header: 'common.code',
      flex: 0.3,
    },
    {
      columnDef: 'input',
      header: 'Ghi nhận nỗ lực',
    },
    {
      columnDef: '%_ Tham gia',
      header: '% Tham gia',
    },
    // {
    //   columnDef: 'action',
    //   header: 'common.actions',
    //   actions: [ 'view','edit', 'delete'],
    // }
  ];

  formGroup = this.fb.group({
    month: [moment(new Date().setDate(1))],
    uocluong: [],
    chot: [],
    date: [],
    nghiemthu: [],
    ghichu: [],
    arr: this.fb.array([])
  });
  a = [1, 2, 3, 4];

  constructor(injector: Injector, projectService: ProjectManagementService,
              public dialogRef: MatDialogRef<ProjectEffortComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    super(injector, projectService);
  }

  ngOnInit(): void {
    this.a.forEach(item => {
      this.addArr();
    })
  }

  get arr(): FormArray {
    return this.formGroup.get('arr') as FormArray;
  }

  newArr(): FormGroup {
    return this.fb.group({
      name: 'name',
      code: 'name',
      input: '',
    });
  }

  removeArr(i: number) {
    this.arr.removeAt(i);
  }

  addArr() {
    this.arr.push(this.newArr());
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
    }

  actionClick(e: any): void {
    if (e.type === 'edit') {
      this.addOrEdit(e.data.id);
    }

    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id);
    }
  }
}
