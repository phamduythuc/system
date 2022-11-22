import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {ProjectService} from '@shared/services/project.service';
import {EffortService} from '@shared/services/effort.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, Validators} from '@angular/forms';
import {StaffService} from '@shared/services/staff.service';
import {AchievementService} from '@shared/services/achievement.service';
import {forkJoin} from 'rxjs';
import {CommonUtilsService} from "@shared/common-utils.service";
import moment from "moment";

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.scss']
})
export class ProjectMemberComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSDA';

  staffList: any[] = [];
  staffFilter: any[] = [];
  members: any[] = [];
  isLoading: boolean = false;
  mapMembers: any = {};

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
    // }df ds
  ];

  constructor(injector: Injector,
              private staffService: StaffService,
              private achievementService: AchievementService,
              private projectService: ProjectService,
              private effortService: EffortService,
              public dialogRef: MatDialogRef<ProjectMemberComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    super(injector, effortService);
    this.formGroup = this.fb.group({
      id: [],
      keyword: [],
      projectId: [data.id],
      selectedMembers: [],
      members: this.fb.array([]),
    });
  }

  get formMembers(): FormArray {
    return this.formGroup.get('members') as FormArray;
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    forkJoin([this.projectService.getMembers(this.data.id), this.staffService.search({status: 1})])
      .subscribe(([res, res1]) => {
        this.members = res.data;
        this.mapMembers = {};
        this.members.forEach(item => {
          this.loadAvatar(item);
          item.date = item.startDate ? moment(Number(item.startDate)) : null;
          this.mapMembers[item.id] = item;
          this.formMembers.push(this.createFormItem(item));
        });
        this.staffList = res1.data;
        this.staffFilter = this.staffList.filter(item => !this.mapMembers[item.id]);
      });
  }

  getListStaff(textSearch?): void {
    const dataSearch = {status: 1};
    if (textSearch) {
      dataSearch['fullName'] = textSearch;
    }
    this.staffService.search(dataSearch).subscribe(res => {
      this.staffList = res.data;
      this.staffFilter = this.staffList.filter(item => !this.mapMembers[item.id]);
    });
  }

  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.members.forEach(item => {
      item.staffId = item.id;
      item.startDate = CommonUtilsService.dateToString(item.date, false);
    });
    const body = {
      projectId: this.data.id,
      members: this.members
    };
    this.projectService.saveMembers(body).subscribe(res => {
      if (this.isSuccess(res)) {
        this.showSnackBar(res.message, 'success');
        this.dialogRef.close(true);
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }

  addMember() {
    this.formGroup.get('keyword').patchValue('');
    const addList = this.formGroup.get('selectedMembers').value;
    addList.forEach(item => {
      this.loadAvatar(item);
      item.isManager = 0;
    });
    this.loadAvatar(addList);
    this.members = [...addList, ...this.members];
    this.mapMembers = {};
    this.formMembers.clear();
    this.members.forEach(item => {
      this.mapMembers[item.id] = item;
      this.formMembers.push(this.createFormItem(item));
    });
    this.staffFilter = this.staffList.filter(item => !this.mapMembers[item.id]);
    this.getListStaff();
    this.formGroup.get('selectedMembers').reset();
  }

  createFormItem(data: any) {
    return this.fb.group({
      id: [data.id],
      fullName: [data.fullName],
      staffCode: [data.staffCode],
      date: [data.startDate ? moment(Number(data.startDate)) : null],
    });
  }

  removeMember(index?) {
    this.members.splice(index, 1);
    this.mapMembers = {};
    this.members.forEach(item => this.mapMembers[item.id] = item);
    this.getListStaff();
  }

  loadAvatar(member): void {
    if (member.imageUrl) {
      this.achievementService.downloadFile(member.imageUrl).subscribe(res => {
        member.avatar = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res.body));
      });
    }
  }

  changeStartDate(i: number, event: any) {
    this.members[i].date = event.value;
    this.members[i].startDate = CommonUtilsService.dateToString(event.value, false);
  }
}
