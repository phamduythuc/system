import {AfterContentInit, Component, Inject, inject, Injector, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "@core/base.component";
import {TeamManagementService} from "../team-management.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StaffManagementService} from "../../staff-management/staff-management.service";
import {debounceTime, map} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-add-or-edit-team',
  templateUrl: './add-or-edit-team.component.html',
  styleUrls: ['./add-or-edit-team.component.scss']
})
export class AddOrEditTeamComponent extends BaseComponent implements OnInit, AfterContentInit {

  @ViewChild('selectMember') selectMember

  dialogId: any;
  formGroup = this.fb.group({
    name: [null, Validators.required],
    staDate: [],
    status: [1],
    departmentId: [null, Validators.required],
    description: [],
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
              teamService: TeamManagementService,
              dialogRef: MatDialogRef<AddOrEditTeamComponent>,
              private staffService: StaffManagementService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, teamService, dialogRef);
    this.dialogId = data?.id;
    if (this.dialogId) {
      this.getDetails(this.dialogId);
    } else {
      this.getListStaff()
      this.formGroup.get('searchStaff').valueChanges.pipe(
        map(event => {
          return event;
        }),
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(
        res => {
          console.log(res)
          this.getListStaff(res)
        }
      )
    }
    ;
    this.getListDepartment();
  }

  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
  }

  getListDepartment() {
    this.staffService.getListDepartment(this.searchModel).subscribe(res => {
      this.listDepartment = res.data;
    })
  }

  getListStaff(textSearch?) {
    const dataSearch = {status: 1}
    if (textSearch) {
      dataSearch['fullName'] = textSearch;
    }
    this.staffService.search(dataSearch).subscribe(res => {
      this.listStaff = res.data
      if (this.listMembers.length > 0) {
        this.listMembers.forEach(item => {
          const index = this.listStaff.findIndex(el => el.id === item.id)
          if (index >= 0) {
            this.listStaff.splice(index, 1)
          }
        })
      }

    })
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  save(value: any) {
    this.handleCoverTimeToString(value)
    const teamData = {
      id: this.dialogId && this.dialogId,
      name: value.name,
      staDate: value.staDate,
      status: value.status,
      departmentId: value.departmentId,
      description: value.description,
      endDate: value.endDate,
      members: value.members.map(item => ({staffId: item.id, isManager: item.isManager})),
    }
    console.log(teamData)
    this.addOrEdit(teamData)
    return false;
  }

  changeManager(e, member, s) {
    member.isManager = e.value
    console.log(e, member, s);
    // console.log(this.members);

  }

  addMemberToTeam(value) {
    this.listMembers = [...value, ...this.listMembers]
    this.selectMember.value = []
    this.listStaff = []
    this.getListStaff()
    console.log(this.selectMember.value);
  }

  deleteFromAddForm(index: any) {
    this.listMembers.splice(index, 1)
    this.getListStaff()
  }
}
