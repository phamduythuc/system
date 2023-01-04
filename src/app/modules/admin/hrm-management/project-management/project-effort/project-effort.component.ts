import {Component, ElementRef, Inject, Injector, Input, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {ProjectService} from '@shared/services/project.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment, {Moment} from 'moment';
import {CommonUtilsService} from '@shared/common-utils.service';
import {FormArray, FormGroup, Validators} from '@angular/forms';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {MONTH_FORMAT} from '@shared/app.constant';
import {AchievementService} from '@shared/services/achievement.service';
import {StaffService} from '@shared/services/staff.service';
import {SprintService} from '@shared/services/sprint.service';
import FileSaver from 'file-saver';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-project-effort',
  templateUrl: './project-effort.component.html',
  styleUrls: ['./project-effort.component.scss']
})
export class ProjectEffortComponent extends BaseComponent implements OnInit {

  visibleBtnUpload: boolean = true;


  _permissionCodeName = 'DSDA';
  panelOpenState = false;
  recordUrl: any = '';
  unitPrice: any  = '';
  documentName: any = '';

  isLoading: boolean = false;
  listStaffOrigin: any = [];
  mapStaff: any = {};
  listStaffLevels: any;
  listStaff: any = {};
  filteredList: any = {};
  numberChars = new RegExp('[\.,]', 'g');

  option = {
    page: 0,
    pageSize: 100,
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
    },
    {
      columnDef: 'percentEffort',
      header: 'effort.timeAllocation',
      cellRenderer: (row) => (row.percentEffort || 0) + '%',
      flex: 0.3
    },
    {
      columnDef: 'actionCustom',
      header: 'common.actions',
      // actions: [ 'delete'],
      flex: 0.1,
    }
  ];


  constructor(
    injector: Injector,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private staffService: StaffService,
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
      estimate: ['', [Validators.pattern('^\\d+$')]],
      unitPrice: [''],
      progress: [''],
      effort: [''], /* ???? Ghi nhan NL (NN) */
      effortExchange: [''],  /* ???? Ghi nhan NL quy doi (NN) */
      acceptanceEffort: [''],
      acceptanceDate: [''],
      recordUrl: [''],
      effortDifference: [''],
      cumulativeDifference: [''],
      differenceVnd: [''],
      cumulativeDifferenceVnd: [''],
      revenue: [''],
      cost: [''],
      efficiency: [''],
      note: [''],
      file: [],
      effortDetail: this.fb.array([])
    });

    this.loadProjectRole();

  }


  ngOnInit(): void {
    this.loadEffortDetail(this.formGroup.get('startDate').value);
  }

  get efforts(): FormArray {
    return this.formGroup.get('effortDetail') as FormArray;
  }

  loadEffortDetail(month) {

    // const monthStr = CommonUtilsService.dateToString(month, false);
    const monthTimeStr = CommonUtilsService.dateToString(month, false);
    const searchObj = {projectId: this.data.id, startDate: monthTimeStr};
    this.isLoading = true;
    this.efforts.clear();
    this.sprintService.getSprint(searchObj).subscribe(res => {
      if (this.isSuccess(res)) {

        this.unitPrice = this.formatCurrency(res.data.unitPrice);

        const urlName = res.data.recordUrl;
        this.recordUrl = urlName;

        this.documentName = res.data.documentName || res.data.recordUrl ? res.data.recordUrl.substring(res.data.recordUrl.lastIndexOf('/') + 1) : '';
        if(this.documentName !== ''){
          this.visibleBtnUpload = !this.visibleBtnUpload;

        }
        this.formGroup.patchValue({
          id: res.data.id,
          unitPrice: this.unitPrice,
          progress: res.data.progress,
          recordUrl: res.data.recordUrl,
          acceptanceEffort: res.data.acceptanceEffort,
          acceptanceDate: res.data.acceptanceDate,
          effortDifference: res.data.effortDifference,
          cumulativeDifference: res.data.cumulativeDifference,
          differenceVnd: res.data.differenceVnd,
          cumulativeDifferenceVnd: res.data.cumulativeDifferenceVnd,
          revenue: res.data.revenue,
          cost: res.data.cost,
          efficiency: res.data.efficiency,
          note: res.data.note,
          estimate: res.data.estimate,
          effort: res.data.effort,
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
          effortDifference: null,
          cumulativeDifference: null,
          differenceVnd: null,
          cumulativeDifferenceVnd: null,
          revenue: null,
          cost: null,
          efficiency: null,
          note: null,
          estimate: null,
          effort: null,
        });
      }
    });

    this.sprintService.getMembers(searchObj).subscribe(res => {
      console.log(res);

      if (this.isSuccess(res)) {
        res.data.forEach(item => {
          this.efforts.push(this.newItem(item));
        });
        this.isLoading = false;
      }
      this.loadStaffs();
    });
  }

  newItem(data: any): FormGroup {

    return this.fb.group({
      staffId: [data.staffId],
      roleId: [data.roleId],
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
    if(valUnitPrice != null){
      formValue.unitPrice = Number(valUnitPrice.replace(this.numberChars, ''));
    }
    formValue.startDate = formValue.startDate && CommonUtilsService.dateToString(formValue.startDate);
    formValue.projectId = this.data.id;

    formData.append('file', this.formGroup.get('file').value || null);
    formData.append('data', new Blob([JSON.stringify(formValue)], {type: 'application/json'}));
    if (formValue.id) {
      this.sprintService.update(formData).subscribe(res => {
        if ('00' === res.code) {

          this.showSnackBar(res.message, 'success');
          this.dialogRef.close(true);
        } else {

          this.showSnackBar(res.message, 'error');
        }
      });
    } else {
      this.sprintService.create(formData).subscribe(res => {
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

  // actionClick(e: any): void {
  //   if (e.type === 'edit') {
  //     this.addOrEdit(e.data.id);
  //   }

  //   if (e.type === 'delete') {
  //     this.deleteConfirmDialog(e.data.id);
  //   }
  // }

  changeMonth() {
    this.formGroup.patchValue({arr: this.fb.array([])});
    const month = moment(this.formGroup.get('startDate').value);
    if (month) {
      this.formGroup.patchValue({name: this.generateName(month)});
      this.loadEffortDetail(month);
    }
  }

  generateName(month: any): string {
    return `Sprint tháng ${month.format(MONTH_FORMAT)}`;
  }

  convertBase64(recordUrl): void {
    if (recordUrl) {
      this.achievementService.downloadFile(recordUrl).subscribe(res1 => {
        this.documentName = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res1.body));
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
      this.formGroup.patchValue({file});
      reader.onload = () => {
        // this.recordUrl = reader.result;
        this.documentName = file.name;
        this.visibleBtnUpload = !this.visibleBtnUpload;
      };
    };
  }

  removeFile(){
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
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }


  loadProjectRole() {
    this.sprintService.getRoleStaff(this.option).subscribe(res => {
      if (res.code === '00') {
        this.listStaffLevels = res.data;
        this.listStaffLevels.forEach(item => {
          item.id = Number(item.id);
        });
      }
    });
  }

  loadStaffs() {
    this.mapStaff = {};
    this.staffService.search().subscribe(res => {
      this.listStaffOrigin = [...res.data];
      this.listStaffOrigin.forEach(item => {
        this.mapStaff[item.id] = item;
      });

      this.efforts.value.forEach((item, index) => {
        this.listStaff[index] = [...res.data];
        this.filteredList[index] = [...res.data];
      });

    });
  }


  deleteRow(index: number) {
    delete this.listStaff[index];
    delete this.filteredList[index];
    this.isLoading = true;
    this.efforts.removeAt(index);
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }

  onStaffChange(event: any, index: number) {
    console.log(event);
    this.efforts.at(index).patchValue({staffCode: this.mapStaff[event.value].staffCode});
  }

  downloadDocument(recordUrl: any) {
    this.achievementService.renderFile({filePath: recordUrl, fileType: 2}).subscribe(res => {
      const res1 = this.getResponseFromHeader(res.headers);

      if (this.isSuccess(res1)) {
        const fileName = this.getFileName(res.headers);
        FileSaver.saveAs(res.body, fileName || this.documentName);
      } else {
        this.showSnackBar(res1.message, 'error');
      }
    });
  }

}
