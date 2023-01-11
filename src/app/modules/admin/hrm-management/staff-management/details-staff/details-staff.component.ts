import {
  Component,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StaffService } from '@shared/services/staff.service';
import { BaseComponent } from '@core/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment, { Moment } from 'moment';
import { Validators } from '@angular/forms';
import { StaffKpiComponent } from '../staff-kpi/staff-kpi.component';
import { IColumn } from '@layout/common/data-table/data-table.component';
@Component({
  selector: 'app-details-staff',
  templateUrl: './details-staff.component.html',
  styleUrls: ['./details-staff.component.scss'],
})
export class DetailsStaffComponent extends BaseComponent implements OnInit {
  @Input() drawer: any;
  @ViewChild('chartChild')
  listRoleStaff: any = [];
  listPositions: any = [];
  listStaffLevels: any = [];
  listDepartment: any = [];

  _permissionCodeName = 'DSNV';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'contract_code',
      header: 'hrm-management.staff.detail.contract.contract_code',
      flex: 0.7,
    },
    {
      columnDef: 'contract',
      header: 'hrm-management.staff.detail.contract.contract',
    },
    {
      columnDef: 'duration',
      header: 'hrm-management.staff.detail.contract.duration',
      flex: 0.5,
    },
    {
      columnDef: 'startTime',
      header: 'hrm-management.staff.detail.contract.startTime',
    },
    {
      columnDef: 'salary',
      header: 'hrm-management.staff.detail.contract.salary',
      flex: 0.5,
    },
    {
      columnDef: 'link',
      header: 'hrm-management.staff.detail.contract.link',
      flex: 0.5,
    },
  ];

  formGroup = this.fb.group({
    staffId: [],
    startMonth: [
      moment().add(-7, 'month').startOf('month'),
      Validators.required,
    ],
    endMonth: [moment().add(-1, 'month').endOf('month'), Validators.required],
  });

  option = {
    page: 0,
    pageSize: 999999,
  };

  genders = [
    {
      name: this.translocoService.translate('gender.female'),
      value: '1',
    },
    {
      name: this.translocoService.translate('gender.male'),
      value: '2',
    },
    {
      name: this.translocoService.translate('gender.other'),
      value: '3',
    },
  ];

  constructor(
    injector: Injector,
    private staffService: StaffService,
    public dialogRef: MatDialogRef<StaffKpiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(injector, staffService);

    this.getListPosition();
    this.getListStaffLevel();
    this.getListDepartment();

    let dialogId = data?.id;
    if (dialogId) {
      this.getDetails(dialogId);
    }
    this.formGroup.patchValue({ staffId: data?.id });
  }

  ngOnInit(): void {
    console.log("====");
    this.searchModel = {
      page: 0,
      pageSize: 10,
      status: 1,
      keyword: '',
    };
    this.getListRoleStaff();
  }

  getListRoleStaff() {
    this.staffService.getRoleStaff(this.option).subscribe((res) => {
      if (res.code === '00') {
        this.listRoleStaff = res.data;
        this.listRoleStaff.map((x: any) => {
          x.roleId = Number(x.roleId);
          if (Number(x?.roleId) == this.detailsData?.role) {
            this.detailsData.roleName = x.name;
          }
          return x;
        });
        this.listRoleStaff.forEach(
          (item) => (item.roleId = Number(item.roleId))
        );
      }
    });
  }
  getListPosition(): void {
    this.staffService.getListPosition(this.searchModel).subscribe((res) => {
      this.listPositions = res.data;
    });
  }
  getListStaffLevel() {
    this.staffService.getListStaffLevel(this.searchModel).subscribe((res) => {
      this.listStaffLevels = res.data;
    });
  }
  getListDepartment() {
    this.staffService.getListDepartment(this.searchModel).subscribe((res) => {
      this.listDepartment = res.data;
    });
  }

  chosenYearHandler(normalizedYear: Moment, formTarget): void {
    const ctrlValue = formTarget.value;
    ctrlValue.year(normalizedYear.year());
    formTarget.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: any,
    formTarget
  ): void {
    const ctrlValue = formTarget.value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.date('1');
    formTarget.setValue(ctrlValue);
    datepicker.close();
  }

  close() {
    this.drawer?.toggle();
  }
}
