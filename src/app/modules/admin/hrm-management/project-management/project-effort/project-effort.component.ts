import {ChangeDetectorRef, Component, Inject, Injector, Input, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {ProjectService} from '@shared/services/project.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment, {Moment} from 'moment';
import {CommonUtilsService} from '@shared/common-utils.service';
import {FormArray, FormGroup, Validators} from '@angular/forms';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {EffortService} from '@shared/services/effort.service';
import {forkJoin, map, Observable, startWith} from 'rxjs';
import {MONTH_FORMAT} from '@shared/app.constant';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import { datePickerValidator } from '@shared/validation/date-picker.validation';
import { AchievementService } from '@shared/services/achievement.service';
import { StaffService } from '@shared/services/staff.service';
import { SprintService } from '@shared/services/sprint.service';

@Component({
  selector: 'app-project-effort',
  templateUrl: './project-effort.component.html',
  styleUrls: ['./project-effort.component.scss']
})
export class ProjectEffortComponent extends BaseComponent implements OnInit {
  // filteredOptions: Observable<string[]>;


  projectSelected: any ;
  _permissionCodeName = 'DSDA';
  panelOpenState = false;
  recordUrl: any = '';
  staffNameTypes: any = [];
  listStaff: any = [];
  isLoading: boolean = false;
  listStaffLevels: any ;

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
      flex: 0.2,
    },
    {
      columnDef: 'roleName',
      header: 'effort.role',
      flex: 0.1,
    },
    {
      columnDef: 'effort',
      header: 'effort.acknowledgmentOfEffortMM',
      flex: 0.3,
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
              private effortService: EffortService,
              private sprintService: SprintService,
              private staffService: StaffService,
              public dialogRef: MatDialogRef<ProjectEffortComponent>,
              private achievementService: AchievementService,
              @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(injector, sprintService);
    this.getStaff();
    const month = moment().startOf('month');
    this.formGroup = this.fb.group({
      id: [''],
      startDate: [month,Validators.required],
      estimate: ['', [ Validators.pattern('^\\d+$')]],
      unitPrice: [''],
      progress: [''],
      // acceptanceEffort: [''], /* ???? Ghi nhan NL (NN) */
      acknowledgmentOfEffortChange: [''],  /* ???? Ghi nhan NL quy doi (NN) */
      acceptanceEffort: [''],
      acceptanceDate: [''],
      recordUrl:[''],
      effortDifference : [''],
      cumulativeDifference : [''],
      differenceVnd: [''],
      cumulativeDifferenceVnd: [''],
      revenue: [''],
      cost:[''],
      efficiency: [''],
      note: [''],
      file: [],
      effortDetail: this.fb.array([])
    });

  }

  ngOnChange(): void {

  }


  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.listStaff.filter(option => option.toLowerCase().includes(filterValue));
  // }

  ngOnInit(): void {

    // this.filteredOptions = this.formGroup.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );

    // if (this.projectSelected && this.projectSelected !== -1) {
    //   this.getDetails(this.projectSelected, ({recordUrl}) => {
    //     this.convertBase64(recordUrl);
    //   });
    // }

    console.log(this.formGroup.value);

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
        this.formGroup.patchValue({
          id: res.data.id,
          // acceptanceEffort: res.data.acceptanceEffort,
          unitPrice: res.data.unitPrice,
          progress: res.data.progress,
          acknowledgmentOfEffortChange: res.data.acknowledgmentOfEffortChange,
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
          roleId: res.data.roleId,
          staffId: res.data.staffId,
          // staffCode: res.data.staffCode,
          // staffName: res.data.staffName,
          // roleName: res.data.roleName,
          effort: res.data.effort,
          effortExchange: res.data.effortExchange,
          percentEffort: res.data.percentEffort,

        });

      } else {
        this.formGroup.patchValue({
          id: null,
          // acceptanceEffort: null,
          unitPrice: null,
          progress: null,
          acknowledgmentOfEffortChange: null,
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
          roleId: null,
          staffId: null,
          // staffCode: null,
          // staffName: null,
          // roleName: null,
          effort: null,
          effortExchange: null,
          percentEffort: null,
        });
      }
    });

    this.sprintService.getMembers(searchObj).subscribe(res => {
      if (this.isSuccess(res)) {
        res.data.forEach(item =>{
         this.efforts.push(this.newItem(item))});
        this.isLoading = false;
      }
    });
  }

  newItem(data: any): FormGroup {
    return this.fb.group({
      staffId: [data.staffId],
      roleId: [data.roleId],
      staffCode: [data.staffCode],
      // staffName: [data.staffName],
      // roleName: [data.roleName],
      effort: [data.effort],
      effortExchange: [data.effortExchange],
      percentEffort: [data.percentEffort]
    });
  }

  save() {

    const formData = new FormData();
    const formValue = this.formGroup.value;
    this.handleCoverTimeToString(formValue);
    formValue.startDate = formValue.startDate && CommonUtilsService.dateToString(formValue.startDate);
    formValue.projectId = this.data.id;

    formData.append('file', this.formGroup.get('file').value || null);
    formData.append('data', new Blob([JSON.stringify(formValue)], {type: 'application/json'}));
    if(formValue.id) {
      this.sprintService.update(formData).subscribe(res => {
        if ('00' === res.code) {

          this.showSnackBar(res.message, 'success');
        } else {

          this.showSnackBar(res.message, 'error');
        }
      });
    }else{
      this.sprintService.create(formData).subscribe(res => {
        if ('00' === res.code) {

          this.showSnackBar(res.message, 'success');
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
        this.recordUrl = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res1.body));
      });
    }
  }

  uploadFile(event: any): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file)
      this.formGroup.patchValue({file});
      reader.onload = () => {
        // this.recordUrl = reader.result;
        this.recordUrl = file.name;
      };
    }
  }

  addNewRow(){
    this.isLoading = true;
    this.efforts.push(this.newItem({}));
    setTimeout(() => {this.isLoading = false;}, 100);
  }


  getStaff(){
    this.sprintService.getRoleStaff(this.option).subscribe(res => {
      if (res.code === '00') {
        this.listStaffLevels = res.data;
        this.listStaffLevels.forEach(item =>
          {
             item.id = Number(item.id)
          });
      }
    });

    this.staffService.search().subscribe(res=>{
      this.listStaff = res.data;
    });


  }

  deleteRow(index : number){
    this.isLoading = true;
    this.efforts.removeAt(index);
    setTimeout(() => {this.isLoading = false;}, 100);
  }

  searchStaff(event:any){
    // this.
    console.log(this.listStaff.fullName);
    this.listStaff.forEach(res => {
      const v =  res.fullName.includes(event.target.value);
    console.log(v);

    })

  }
}
