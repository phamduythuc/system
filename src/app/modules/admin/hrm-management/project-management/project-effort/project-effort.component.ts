import {
  Component,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { ProjectService } from '@shared/services/project.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment, { Moment } from 'moment';
import { CommonUtilsService } from '@shared/common-utils.service';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { IColumn } from '@layout/common/data-table/data-table.component';
import { MONTH_FORMAT } from '@shared/app.constant';
import { AchievementService } from '@shared/services/achievement.service';
import { StaffService } from '@shared/services/staff.service';
import { SprintService } from '@shared/services/sprint.service';
import FileSaver from 'file-saver';
import { DecimalPipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { SalaryService } from '@shared/services/salary.service';
import { items } from 'app/mock-api/apps/file-manager/data';

@Component({
  selector: 'app-project-effort',
  templateUrl: './project-effort.component.html',
  styleUrls: ['./project-effort.component.scss'],
})
export class ProjectEffortComponent extends BaseComponent implements OnInit {
  visibleBtnUpload: boolean = true;

  _permissionCodeName = 'DSDA';
  panelOpenState = false;
  recordUrl: any = '';
  unitPrice: any = '';
  cumulativeDifference: any = '';
  cumulativeDifferenceVnd: any = '';
  revenue: any = '';
  cost: any = '';
  documentName: any = '';
  acceptanceDate: any = '';

  isLoading: boolean = false;
  listStaffOrigin: any = [];
  listRoleOrigin: any = [];

  mapStaff: any = {};
  listStaffLevels: any = [];
  listRole: any = {};
  filteredListRole: any = {};
  listStaff: any = {};
  filteredList: any = {};
  numberChars = new RegExp('[.,]', 'g');
  caculateEffortExchange: any = '';
  priceDefalt = 30000000;
  effortDifferenceVnd: any = '';
  listStatusStaff: any = [];

  disBtn = false;
  disabledLogErr = true;

  option = {
    page: 0,
    pageSize: 999999,
  };

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.1,
    },
    {
      columnDef: 'staffCode',
      header: 'common.code',
      flex: 0.1,
    },
    {
      columnDef: 'staffName',
      header: 'staff.staffName',
      flex: 0.3,
    },
    {
      columnDef: 'roleName',
      header: 'effort.role',
      flex: 0.1,
    },
    {
      columnDef: 'effort',
      header: 'effort.acknowledgmentOfEffortMM',
      flex: 0.1,
    },
    {
      columnDef: 'effortExchange',
      header: 'effort.conversionEffort',
      flex: 0.3,
      cellRenderer: (row) => this.formatCurrency(row.effortExchange),
    },
    {
      columnDef: 'percentEffort',
      header: 'effort.timeAllocation',
      cellRenderer: (row) => (row.percentEffort || 0) + '%',
      flex: 0.3,
    },
    {
      columnDef: 'actionCustom',
      header: 'common.actions',
      // actions: [ 'delete'],
      flex: 0.1,
    },
  ];

  constructor(
    injector: Injector,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private staffService: StaffService,
    private staffSalary: SalaryService,
    public dialogRef: MatDialogRef<ProjectEffortComponent>,
    private achievementService: AchievementService,
    private decimalPipe: DecimalPipe,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(injector, sprintService);
    const month = moment().startOf('month');
    this.formGroup = this.fb.group({
      id: [''],
      startDate: [month, Validators.required],
      estimate: ['', Validators.required],
      unitPrice: [''],
      progress: [''],
      effort: [''] /* ???? Ghi nhan NL (NN) */,
      effortExchange: [''] /* ???? Ghi nhan NL quy doi (NN) */,
      acceptanceEffort: [''],
      acceptanceDate: [''],
      recordUrl: [''],
      effortDifference: [''],
      cumulativeDifference: [''],
      effortDifferenceVnd: [''],
      cumulativeDifferenceVnd: [''],
      revenue: [''],
      cost: [''],
      efficiency: [''],
      note: [''],
      file: [],
      effortDetail: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadEffortDetail(this.formGroup.get('startDate').value);
    this.loadProjectRole();
  }

  get efforts(): FormArray {
    return this.formGroup.get('effortDetail') as FormArray;
  }

  loadEffortDetail(month) {
    // const monthStr = CommonUtilsService.dateToString(month, false);
    const monthTimeStr = CommonUtilsService.dateToString(month, false);
    const searchObj = { projectId: this.data.id, startDate: monthTimeStr };
    this.isLoading = true;
    this.efforts.clear();
    forkJoin([
      this.staffService.search(),
      this.sprintService.getSprint(searchObj),
    ]).subscribe(([resStaff, res]) => {
      this.loadStaffs(resStaff);
      this.getUnitPrice();
      if (this.isSuccess(res)) {
        // this.unitPrice = this.formatCurrency(res.data.unitPrice);
        this.cumulativeDifference = this.formatCurrency(
          res.data.cumulativeDifference
        );
        this.revenue = this.formatCurrency(res.data.revenue);
        this.cost = this.formatCurrency(res.data.cost);
        this.effortDifferenceVnd = this.formatCurrency(
          res.data.effortDifferenceVnd
        );

        this.cumulativeDifferenceVnd = this.formatCurrency(
          res.data.cumulativeDifferenceVnd
        );
        this.acceptanceDate = res.data.acceptanceDate ? moment(res.data.acceptanceDate) : null;

        const urlName = res.data.recordUrl;
        this.recordUrl = urlName;

        this.documentName =
          res.data.documentName || res.data.recordUrl
            ? res.data.recordUrl.substring(
                res.data.recordUrl.lastIndexOf('/') + 1
              )
            : '';
        if (this.documentName !== '') {
          this.visibleBtnUpload = !this.visibleBtnUpload;
        }

        this.formGroup.patchValue({
          id: res.data.id,
          // unitPrice: this.unitPrice,
          progress: res.data.progress,
          recordUrl: res.data.recordUrl,
          effortExchange: res.data.effortExchange,
          acceptanceEffort: res.data.acceptanceEffort,
          acceptanceDate: this.acceptanceDate,
          effortDifference: res.data.effortDifference,
          cumulativeDifference: this.cumulativeDifference,
          effortDifferenceVnd: this.effortDifferenceVnd,
          cumulativeDifferenceVnd: this.cumulativeDifferenceVnd,
          revenue: this.revenue,
          cost: this.cost,
          efficiency: res.data.efficiency,
          note: res.data.note,
          estimate: res.data.estimate,
          effort: res.data.effort,
        });
        const idS = { id: res.data.id };
        this.sprintService.getMembers(idS).subscribe((res1) => {
          if (this.isSuccess(res1)) {
            res1.data.forEach((item, index) => {


              this.efforts.push(this.newItem(item));
              this.listStaff[index] = [...this.listStaffOrigin];
              this.filteredList[index] = [...this.listStaffOrigin];

              this.listRole[index] = [...this.listRoleOrigin];
              this.filteredListRole[index] = [...this.listRoleOrigin];

            });

            this.isLoading = false;
          }
        });

      } else {
        this.documentName = '';
        this.formGroup.patchValue({
          id: null,
          unitPrice: null,
          progress: null,
          recordUrl: null,
          acceptanceEffort: null,
          acceptanceDate: null,
          effortDifferenceVnd: null,
          cumulativeDifference: null,
          differenceVnd: null,
          cumulativeDifferenceVnd: null,
          revenue: null,
          cost: null,
          efficiency: null,
          note: null,
          estimate: null,
          effort: null,
          effortExchange: null,
        });
      }
    });
  }

  newItem(data: any): FormGroup {
    return this.fb.group({
      staffId: [data.staffId, [Validators.required]],
      roleId: [data.roleId, [Validators.required]],
      staffCode: [data.staffCode],
      effort: [data.effort],
      effortExchange: [data.effortExchange],
      percentEffort: [data.percentEffort],
      // staffName: [data.staffName],
      // roleName: [data.roleName],
    });
  }

  save() {
    const formData = new FormData();
    const formValue = this.formGroup.value;

    this.handleCoverTimeToString(formValue);

    const valUnitPrice = formValue.unitPrice;
    if (valUnitPrice != null) {
      formValue.unitPrice = Number(valUnitPrice.replace(this.numberChars, ''));
    }
    const valEffortDifferenceVnd = formValue.effortDifferenceVnd;
    if (valEffortDifferenceVnd != null) {
      formValue.effortDifferenceVnd = Number(
        valEffortDifferenceVnd.replace(this.numberChars, '')
      );
    }
    const valCumulativeDifferenceVnd = formValue.cumulativeDifferenceVnd;
    if (valCumulativeDifferenceVnd != null) {
      formValue.cumulativeDifferenceVnd = Number(
        valCumulativeDifferenceVnd.replace(this.numberChars, '')
      );
    }
    const valCumulativeDifference = formValue.cumulativeDifference;
    if (valCumulativeDifference != null) {
      formValue.cumulativeDifference = Number(
        valCumulativeDifference.replace(this.numberChars, '')
      );
    }
    const valRevenue = formValue.revenue;
    if (valRevenue != null) {
      formValue.revenue = Number(valRevenue.replace(this.numberChars, ''));
    }
    const valCost = formValue.cost;
    if (valCost != null) {
      formValue.cost = Number(valCost.replace(this.numberChars, ''));
    }

    formValue.startDate =
      formValue.startDate &&
      CommonUtilsService.dateToString(formValue.startDate);

    formValue.acceptanceDate =
      formValue.acceptanceDate &&
      CommonUtilsService.dateToString(formValue.acceptanceDate);
    formValue.projectId = this.data.id;
    formValue.progress = Number(formValue.progress);
    formData.append('file', this.formGroup.get('file').value || null);

    formData.append(
      'data',
      new Blob([JSON.stringify(formValue)], { type: 'application/json' })
    );
    // console.log(formValue);

    if (formValue.id) {
      this.sprintService.update(formData).subscribe((res) => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.dialogRef.close(true);
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    } else {
      this.sprintService.create(formData).subscribe((res) => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.dialogRef.close(true);
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    }
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
    datepicker.close();
    const ctrlValue = formTarget.value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.date('1');
    formTarget.setValue(ctrlValue);
  }

  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
    //0 means sunday
    //6 means saturday
  };

  // actionClick(e: any): void {
  //   if (e.type === 'edit') {
  //     this.addOrEdit(e.data.id);
  //   }

  //   if (e.type === 'delete') {
  //     this.deleteConfirmDialog(e.data.id);
  //   }
  // }

  changeMonth() {
    this.formGroup.patchValue({ arr: this.fb.array([]) });
    const month = moment(this.formGroup.get('startDate').value);
    if (month) {
      this.formGroup.patchValue({ name: this.generateName(month) });
      this.loadEffortDetail(month);
    }
  }

  generateName(month: any): string {
    return `Sprint tháng ${month.format(MONTH_FORMAT)}`;
  }

  convertBase64(recordUrl): void {
    if (recordUrl) {
      this.achievementService.downloadFile(recordUrl).subscribe((res1) => {
        this.documentName = this._sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(res1.body)
        );
      });
    }
  }

  formatCurrency(val: any) {
    return this.decimalPipe.transform(val, '1.0', 'en-US');
  }

  uploadFile(event: any): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.formGroup.patchValue({ file });
      reader.onload = () => {
        // this.recordUrl = reader.result;
        this.documentName = file.name;
        this.visibleBtnUpload = !this.visibleBtnUpload;
      };
    }
  }

  removeFile() {
    this.formGroup.controls['recordUrl'].setValue(null);
    this.recordUrl = null;
    this.documentName = null;
    this.visibleBtnUpload = !this.visibleBtnUpload;
  }

  addNewRow() {
    this.isLoading = true;
    this.efforts.push(this.newItem({}));
    this.listStaff[this.efforts.length - 1] = [...this.listStaffOrigin];
    this.filteredList[this.efforts.length - 1] = [...this.listStaffOrigin];
    this.listRole[this.efforts.length - 1] = [...this.listRoleOrigin];
    this.filteredListRole[this.efforts.length - 1] = [...this.listRoleOrigin];

    setTimeout(() => {
      this.isLoading = false;
    }, 1);
  }

  loadProjectRole() {
    this.sprintService.getRoleStaff(this.option).subscribe((res) => {
      if (res.code === '00') {
        // this.listStaffLevels = res.data;
        res.data.forEach((itemStatus) => {
          if (itemStatus.status === 1) {
            this.listStaffLevels.push(itemStatus);
          // console.log(this.listStaffLevels);

          }
        });
        this.listRoleOrigin = [...this.listStaffLevels];
        // console.log(this.listRoleOrigin);

        this.listRoleOrigin.forEach((item) => {
          item.id = Number(item.id);
        });
      }
    });
  }

  loadStaffs(res) {
    this.mapStaff = {};
    res.data.forEach((itemStatus) => {
      if (itemStatus.status === 1) {
        this.listStatusStaff.push(itemStatus);
      }
    });
    this.listStaffOrigin = [...this.listStatusStaff];
    this.listStaffOrigin.forEach((item) => {
      this.mapStaff[item.id] = item;
    });
  }

  deleteRow(index: number) {
    // console.log(this.listStaff[index]);
    // console.log(this.listStaffOrigin);

    delete this.listStaff[index];
    delete this.filteredList[index];
    delete this.listRole[index];
    delete this.filteredListRole[index];
    this.isLoading = true;
    this.efforts.removeAt(index);
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }

  onStaffChange(event: any, index: number) {
    this.efforts
      .at(index)
      .patchValue({ staffCode: this.mapStaff[event.value].staffCode });

    const lstStaffIds = this.efforts.value.map((item) => item.staffId);

    const findDuplicateVal = (lstStaffIds) =>
      lstStaffIds.filter((item, index) => lstStaffIds.indexOf(item) !== index);

    const arrLenghtDuplicateVal = findDuplicateVal(lstStaffIds).length;

    if (arrLenghtDuplicateVal !== 0) {
      this.disBtn = true;
      this.disabledLogErr = false;
    } else {
      this.disBtn = false;
      this.disabledLogErr = true;
    }

    // console.log(lstStaffIds);
  }

  downloadDocument(recordUrl: any) {
    this.achievementService
      .renderFile({ filePath: recordUrl, fileType: 2 })
      .subscribe((res) => {
        const res1 = this.getResponseFromHeader(res.headers);

        if (this.isSuccess(res1)) {
          const fileName = this.getFileName(res.headers);
          FileSaver.saveAs(res.body, fileName || this.documentName);
        } else {
          this.showSnackBar(res1.message, 'error');
        }
      });
  }

  getUnitPrice() {
    if (this.data.id) {
      this.sprintService.getOne(this.data.id).subscribe((res) => {
        if (this.isSuccess(res)) {
          this.formGroup.controls['unitPrice'].setValue(
            this.formatCurrency(res.data.unitPrice)
          );
        } else {
          this.formGroup.controls['unitPrice'].setValue(null);
        }
      });
    }
  }

  effortConversionCalculation(data: any) {
    return this.formatCurrency(
      (data.unitPrice / this.priceDefalt) * data.effort
    );
  }

  caculateExchange(e: any, i: number) {
    const valChangePrice = this.formGroup.value.unitPrice;
    if (valChangePrice != null) {
      const newUnitPrice = Number(valChangePrice.replace(this.numberChars, ''));
      this.efforts
        .at(i)
        .patchValue({ effortExchange: (newUnitPrice / this.priceDefalt) * e });
    }
  }

  // caculateCost(){
  //   const params = {
  //     month: CommonUtilsService.dateToString(
  //       this.formGroup.get('startDate').value,
  //       false
  //     ),
  //     page: 0,
  //     pageSize: 10000000,
  //     status: 1,
  //   };

  //   this.staffSalary.getViewSalarybyMonth(params).subscribe(res=>{

  //   });
  // }
}
