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
  members:any;
  addMember: any;

  constructor(injector: Injector, staffService: StaffManagementService,fb:FormBuilder) {
    super(injector, staffService)
    this.addMember = fb.group({
      name : [],
      addList:[null,Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'teamId': {
            if (this.teamId) {
              this.addMember.get('name').patchValue('')
              this.getListMember()
              // forkJoin([this.getListMember()]).subscribe(([res])=>{
              //   console.log(res)
              //   this.getListStaff()
              // })
              // this.getListMember()

            }
            console.log(this.teamId)
          }
        }
      }
    }
  }


  ngOnInit(): void {
    this.getListStaff()
    this.members = [
      {
        id:1,
        avatar: 'assets/images/avatars/male-01.jpg',
        fullName: 'Dejesus Michael',
        email: 'dejesusmichael@mail.org',
        isManager: 'admin'
      },
      {
        id:2,
        avatar: 'assets/images/avatars/male-03.jpg',
        fullName: 'Mclaughlin Steele',
        email: 'mclaughlinsteele@mail.me',
        isManager: 'admin'
      },
      {
        id:3,
        avatar: 'assets/images/avatars/female-02.jpg',
        fullName: 'Laverne Dodson',
        email: 'lavernedodson@mail.ca',
        isManager: 'write'
      },
      {
        id:4,
        avatar: 'assets/images/avatars/female-03.jpg',
        fullName: 'Trudy Berg',
        email: 'trudyberg@mail.us',
        isManager: 'read'
      },
      {
        id:5,
        avatar: 'assets/images/avatars/male-07.jpg',
        fullName: 'Lamb Underwood',
        email: 'lambunderwood@mail.me',
        isManager: 'read'
      },
      {
        id:6,
        avatar: 'assets/images/avatars/male-08.jpg',
        fullName: 'Mcleod Wagner',
        email: 'mcleodwagner@mail.biz',
        isManager: 'read'
      },
      {
        id:7,
        avatar: 'assets/images/avatars/female-07.jpg',
        fullName: 'Shannon Kennedy',
        email: 'shannonkennedy@mail.ca',
        isManager: 'read'
      }
    ];

    // Setup the roles
    this.roles = [
      {
        label: 'Read',
        value: 'read',
        description: 'Can read and clone this repository. Can also open and comment on issues and pull requests.'
      },
      {
        label: 'Write',
        value: 'write',
        description: 'Can read, clone, and push to this repository. Can also manage issues and pull requests.'
      },
      {
        label: 'Admin',
        value: 'admin',
        description: 'Can read, clone, and push to this repository. Can also manage issues, pull requests, and repository settings, including adding collaborators.'
      }
    ];
    this.addMember.get('name').valueChanges.pipe(
      map(event=>{
        return event;
      }),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      res=> {
        this.getListStaff(res)
        console.log(res)
      }
    )
    this.searchModel.status=1

  }

  getListMember() {
    this.searchModel.teamId = this.teamId
    this.processSearch(this.searchModel,()=>{
      // this.members = this.searchResult.data
      this.getListStaff()
    })
  }

  getListStaff(name?){
    const arr =[]
    this.searchModel={fullName:name||'',status:1}
    this.processSearch(this.searchModel,()=>{
      this.staffList = this.searchResult.data
      this.staffList = this.staffList.forEach(res=> {
        if(!this.members.includes(el => el.id === res.id)){
          arr.push(res)
        }
      })
      this.staffList =arr
    })

  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  addMemberToTeam() {
    const addList = this.addMember.get('addList').value;
    this.members = [...addList,...this.members]
    console.log(this.members);
  }

  changeManager(e,member) {
    member.isManager = e.value
    console.log(e,member);
    console.log(this.members);

  }

  saveMemberList() {
    const sendDataa = {
      id: this.teamId,
      listMembers: this.members.map(res=>({staffId:res.id,isManager: res.isManager}))
    }
    console.log(sendDataa);
  }
}
