import {AfterContentInit, Component, Inject, Injector, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {TeamService} from '@shared/services/team.service';
import {Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StaffService} from '@shared/services/staff.service';
import {debounceTime, map} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import moment from 'moment';

@Component({
  selector: 'app-add-or-edit-team',
  templateUrl: './add-or-edit-team.component.html',
  styleUrls: ['./add-or-edit-team.component.scss']
})
export class AddOrEditTeamComponent extends BaseComponent implements OnInit, AfterContentInit {

  @ViewChild('selectMember') selectMember;

  currentDate = moment(new Date(Date.now())).format("DD/MM/YYYY");
  dialogId: any;
  formGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(100)]],
    staDate: [],
    status: [1],
    departmentId: [null, Validators.required],
    description: ['',Validators.maxLength(500)],
    endDate: [],
    members: [],
    searchStaff: []
  });
  roles = [
    {
      label: 'Member',
      value: 0,
      description: 'Can read, clone, and push to this repository. Can also manage issues and pull requests.'
    },
    {
      label: 'Admin',
      value: 1,
      description: 'Can read, clone, and push to this repository. Can also manage issues, pull requests, and repository settings, including adding collaborators.'
    }
  ];
  listMembers: any = [];
  listDepartment: any = [];
  listStaff: any = [];

  constructor(injector: Injector,
              teamService: TeamService,
              dialogRef: MatDialogRef<AddOrEditTeamComponent>,
              private staffService: StaffService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, teamService, dialogRef);
    this.dialogId = data?.id;
    if (this.dialogId) {
      this.getDetails(this.dialogId);
    } else {
      this.getListStaff();
      this.formGroup.get('searchStaff').valueChanges.pipe(
        map(event => event),
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(
        res => {
          this.getListStaff(res);
        }
      );
    }
    this.getListDepartment();
  }

  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
  }

  getListDepartment(): void {
    this.searchModel = {
      pageSize: 10,
      status:1
    };
    this.staffService.getListDepartment(this.searchModel).subscribe(res => {
      this.listDepartment = res.data;
    });
  }

  getListStaff(textSearch?: any): void {
    const dataSearch = {status: 1};
    if (textSearch) {
      dataSearch['fullName'] = textSearch;
    }
    this.staffService.search(dataSearch).subscribe(res => {
      this.listStaff = res.data;
      if (this.listMembers.length > 0) {
        this.listMembers.forEach(item => {
          const index = this.listStaff.findIndex(el => el.id === item.id);
          if (index >= 0) {
            this.listStaff.splice(index, 1);
          }
        });
      }
    });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  save(value: any): boolean {
    // this.handleCoverTimeToString(value);
    const teamData = {
      id: this.dialogId && this.dialogId,
      name: value.name,
      staDate: this.currentDate,
      status: this.data.status,
      departmentId: value.departmentId,
      // staffId:540
      // description: value.description,
      // endDate: value.endDate,
      // members: value.members.map(item => ({staffId: item.id, isManager: item.isManager})),
    };
    this.addOrEdit(teamData);
    return false;
  }

  changeManager(e, member, s): void {
    member.isManager = e.value;
    // console.log(this.members);

  }

  addMemberToTeam(value): void {
    this.listMembers = [...value, ...this.listMembers];
    this.selectMember.value = [];
    this.listStaff = [];
    this.getListStaff();
  }

  deleteFromAddForm(index: any): void {
    this.listMembers.splice(index, 1);
    this.getListStaff();
  }
}
