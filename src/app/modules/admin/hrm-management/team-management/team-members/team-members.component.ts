import {Component, Injector, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from "@core/base.component";
import {StaffManagementService} from "../../staff-management/staff-management.service";
import {FormBuilder, FormControl, Validator, Validators} from "@angular/forms";
import {debounceTime, delay, filter, forkJoin, map, ReplaySubject, Subject, takeUntil, tap} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() teamId: any

  roles: any[];
  staffList: any;
  members: any;
  addMember: any;
  number =0

  constructor(injector: Injector, public staffService: StaffManagementService, fb: FormBuilder) {
    super(injector, staffService)
    this.addMember = fb.group({
      name: [],
      addList: [null, Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'teamId': {
            if (this.teamId) {
              this.addMember.get('name').patchValue('');
              this.addMember.get('addList').reset()
              this.getListMember()
            }
            console.log(this.teamId)
          }
        }
      }
    }
  }


  ngOnInit(): void {
    // this.getListStaff()
    // this.members = [
    //   {
    //     id:1,
    //     avatar: 'assets/images/avatars/male-01.jpg',
    //     fullName: 'Dejesus Michael',
    //     email: 'dejesusmichael@mail.org',
    //     isManager: 'admin'
    //   },
    //   {
    //     id:2,
    //     avatar: 'assets/images/avatars/male-03.jpg',
    //     fullName: 'Mclaughlin Steele',
    //     email: 'mclaughlinsteele@mail.me',
    //     isManager: 'admin'
    //   },
    //   {
    //     id:3,
    //     avatar: 'assets/images/avatars/female-02.jpg',
    //     fullName: 'Laverne Dodson',
    //     email: 'lavernedodson@mail.ca',
    //     isManager: 'write'
    //   },
    //   {
    //     id:4,
    //     avatar: 'assets/images/avatars/female-03.jpg',
    //     fullName: 'Trudy Berg',
    //     email: 'trudyberg@mail.us',
    //     isManager: 'read'
    //   },
    //   {
    //     id:5,
    //     avatar: 'assets/images/avatars/male-07.jpg',
    //     fullName: 'Lamb Underwood',
    //     email: 'lambunderwood@mail.me',
    //     isManager: 'read'
    //   },
    //   {
    //     id:6,
    //     avatar: 'assets/images/avatars/male-08.jpg',
    //     fullName: 'Mcleod Wagner',
    //     email: 'mcleodwagner@mail.biz',
    //     isManager: 'read'
    //   },
    //   {
    //     id:7,
    //     avatar: 'assets/images/avatars/female-07.jpg',
    //     fullName: 'Shannon Kennedy',
    //     email: 'shannonkennedy@mail.ca',
    //     isManager: 'read'
    //   }
    // ];

    // Setup the roles
    this.roles = [

      {
        label: 'Member',
        value: 0,
        description: 'Can read, clone, and push to this repository. Can also manage issues and pull requests.'
      },
      {
        label: 'Leader',
        value: 1,
        description: 'Can read, clone, and push to this repository. Can also manage issues, pull requests, and repository settings, including adding collaborators.'
      }
    ];
    this.addMember.get('name').valueChanges.pipe(
      map(event => {
        return event;
      }),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      res => {
        this.getListStaff(res)
        console.log(res)
      }
    )
    this.searchModel.status = 1

  }

  getListMember() {
    this.searchModel.teamId = this.teamId
    this.processSearch(this.searchModel, () => {
      this.members = this.searchResult.data
      this.getListStaff()
    })
  }

  getListStaff(textSearch?) {
    const dataSearch = {status: 1}
    if (textSearch) {
      dataSearch['fullName'] = textSearch;
    }
    this.staffService.search(dataSearch).subscribe(res => {
      this.staffList = res.data
      if (this.members.length > 0) {
        this.members.forEach(item => {
          const index = this.staffList.findIndex(el => el.id === item.id)
          if (index >= 0) {
            this.staffList.splice(index, 1)
          }
        })
      }

    })
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  addMemberToTeam() {
    this.addMember.get('name').patchValue('')
    const addList = this.addMember.get('addList').value;
    this.members = [...addList, ...this.members]
    this.getListStaff()
    this.addMember.get('addList').reset()
    console.log(this.members);
  }

  changeManager(e, member) {
    member.isManager = e.value
    console.log(e, member);
    console.log(this.members);

  }

  saveMemberList() {
    const sendData = {
      teamId: this.teamId,
      members: this.members.map(res => ({staffId: res.id, isManager: res.isManager}))
    }
    this.staffService.saveMemberTeam(sendData).subscribe(res => {
      if (res.code === '00') {
        this.getListMember()
      } else {
        this.showSnackBar(res.message, 'error');
      }

    })
    console.log(sendData);
  }

  deleteFromAddForm(index: any) {
    this.members.splice(index, 1)
    this.getListStaff()
  }
}
