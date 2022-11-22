import {Component, Injector, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {debounceTime, map} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {TeamMemberService} from '@shared/services/team-member.service';
import {AchievementService} from '@shared/services/achievement.service';
import {StaffService} from '@shared/services/staff.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() teamId: any;

  roles: any[];
  staffList: any[] = [];
  staffListFilter: any[] = [];
  members: any;
  mapMembers: any = {};
  addMember: any;

  constructor(injector: Injector,
              public staffService: StaffService,
              public teamMemberService: TeamMemberService,
              public achievementService: AchievementService) {
    super(injector, teamMemberService);
    this.addMember = this.fb.group({
      name: [],
      addList: [[]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'teamId': {
            if (this.teamId) {
              this.addMember.get('name').patchValue('');
              this.addMember.get('addList').reset();
              this.getListMember();
            }
          }
        }
      }
    }
  }


  ngOnInit(): void {
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
      map(event => event),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      res => {
        this.getListStaff(res);
      }
    );
    this.searchModel.status = 1;

  }

  getListMember(): void {
    this.searchModel.teamId = this.teamId;
    this.processSearch(this.searchModel, () => {
      this.members = this.searchResult.data;
      this.members.forEach(member => this.loadAvatar(member));
      this.mapMembers = {};
      this.members.forEach(item => this.mapMembers[item.id] = item);
      this.getListStaff();
    });
  }

  getListStaff(textSearch?): void {
    const dataSearch = {status: 1};
    if (textSearch) {
      dataSearch['fullName'] = textSearch;
    }
    this.staffService.search(dataSearch).subscribe(res => {
      this.staffList = res.data;
      this.staffList.forEach(item => item.staffId = item.id);
      this.staffListFilter = this.staffList.filter(item => !this.mapMembers[item.id]);
    });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  addMemberToTeam(): void {
    this.addMember.get('name').patchValue('');
    const addList = this.addMember.get('addList').value;
    addList.forEach(item => {
      this.loadAvatar(item);
      item.isManager = 0;
    });
    this.loadAvatar(addList);
    this.members = [...addList, ...this.members];
    this.members.forEach(item => this.mapMembers[item.id] = item);
    this.mapMembers = {};
    this.staffListFilter = this.staffList.filter(item => !this.mapMembers[item.id]);
    this.getListStaff();
    this.addMember.get('addList').reset();
  }

  changeManager(e, member): void {
    member.isManager = e.value;
  }

  saveMemberList(): void {
    const sendData = {
      teamId: this.teamId,
      members: this.members.map(member => ({staffId: member.staffId, isManager: member.isManager}))
    };
    this.teamMemberService.saveMembers(sendData).subscribe(res => {
      if (res.code === '00') {
        this.getListMember();
      } else {
        this.showSnackBar(res.message, 'error');
      }

    });
  }

  deleteFromAddForm(index: any): void {
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
}
