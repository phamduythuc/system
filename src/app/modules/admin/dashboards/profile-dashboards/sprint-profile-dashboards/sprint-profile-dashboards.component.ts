import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { TranslocoService } from '@ngneat/transloco';
import { CommonUtilsService } from '@shared/common-utils.service';
import moment, {Moment} from 'moment';

@Component({
  selector: 'app-sprint-profile-dashboards',
  templateUrl: './sprint-profile-dashboards.component.html',
  styleUrls: ['./sprint-profile-dashboards.component.scss']
})
export class SprintProfileDashboardsComponent implements OnInit {
  @Input() data:any

  @Output() callback = new EventEmitter<any>();

  searchModel:any
  _permissionCodeName = 'DSNV';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
    },
    {
      columnDef: 'project_code',
      header: 'dashboard.profile.tab.sprint.project_code',
    },
    {
      columnDef: 'project_name',
      header: 'dashboard.profile.tab.sprint.project_name',
    },
    {
      columnDef: 'recognize',
      header: 'dashboard.profile.tab.sprint.recognize',
    },
    {
      columnDef: 'recognize_exchange',
      header: 'dashboard.profile.tab.sprint.recognize_exchange',
    },
    {
      columnDef: 'time_percent',
      header: 'dashboard.profile.tab.sprint.time_percent'
    },
  ];

  startDate = this._formBuilder.group({
    startMonth: [moment().add(-7, 'month').startOf('month'),Validators.required],
  });

  formGroup = this._formBuilder.group({
    salary: [''],
    target_kpi: [''],
    salary_received: [''],
    guaranteed_kpi: [''],
  });

  
  constructor(private _formBuilder: FormBuilder,private translocoService:TranslocoService) { }

  ngOnChanges(changes: SimpleChanges) {
    // this.formGroup.patchValue(this.data);
    this.data = this.data
    this.formGroup.patchValue(this.data?.salary);
  }

  ngOnInit(): void {
    
    this.searchModel = {
      page: 0,
      pageSize: 10,
      status: 1,
      keyword: '',
    };
  }

  chosenYearHandler(normalizedYear: Moment, formTarget): void {
    const ctrlValue = formTarget.value;
    ctrlValue.year(normalizedYear.year());
    formTarget.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: any, formTarget): void {
    const ctrlValue = formTarget.value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.date('1');
    formTarget.setValue(ctrlValue);
    datepicker.close();
  }

  view(){
    this.startDate.value.startMonth=CommonUtilsService.dateToString(this.startDate.value.startMonth)
    this.callback.emit(this.startDate.value.startMonth)
  }

  handleDataKPI(data){
    console.log(data);
    this.data.data = data
  }

  saveData(){
    console.log(this.data?.data);
  }
}
