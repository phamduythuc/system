import { Component, Injector, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { MatDrawer } from '@angular/material/sidenav';
import { debounceTime, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { TeamService } from '@shared/services/team.service';
import { AddOrEditTeamComponent } from './add-or-edit-team/add-or-edit-team.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ViewType } from '@core/config/app.config';
import { FuseConfigService } from '@fuse/services/config';
import { TeamMemberService } from '@shared/services/team-member.service';


@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.scss']
})
export class TeamManagementComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSD';
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  selectedTeamId: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  formSearch: FormGroup;
  team = 'team';
  selected = 'domain'
  list_type_view: any = [
    {
      type: 'list',
      name: 'setting.typeView.list',
    },
    {
      type: 'grid',
      name: 'setting.typeView.grid',
    },
  ];
  listTeam: any[] = [];
  constructor(injector: Injector,
    public teamService: TeamService,
    public teamMemberService: TeamMemberService,
    fb: FormBuilder,
    private _fuseConfigService: FuseConfigService) {
    super(injector, teamService);
    this.formSearch = this.fb.group({
      name: '',
      option: ['1']
    });
  }

  random: any
  ngOnChanges(changes: SimpleChanges): void {
    this.random = (Math.random() + 1).toString(36).substring(7);

  }

  ngOnInit(): void {
    this.searchModel.pageSize = 3;
    this.formSearch.get('name').valueChanges.pipe(
      map(event => event),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      res => {
        this.listTeam = this.searchResult.data.filter(item => {
          if (item.name.includes(res)) {
            return item;
          }
        });
      }
    );
    // this.searchModel.status = 1;
    this.processSearch(this.searchModel, () => this.callback());


  }

  handlePageEvent(e?: any) {
    console.log(e)
    this.searchModel = {
      page: e.pageIndex,
      pageSize: e.pageSize,
      status: this.formSearch.value['option']
    }
    this.processSearch(this.searchModel);

  }

  doSearch(): void {
    if (this.formSearch.value.name != '') {
      this.searchModel = {
        ...this.searchModel,
        page: 0,
        ...this.formSearch.value,
      };
    }
    else {
      this.searchModel = {
        page: 0,
        pageSize: 10,
      }
    }
    this.processSearch(this.searchModel);
  }

  goToTeam(id: any): void {
    this.selectedTeamId = id;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }

  addOrEdit(id?: any): void {
    this.showDialog(AddOrEditTeamComponent, {
      data: {
        id,
      },
      width: '30vw',
      disableClose: true
    }, (value) => {
      if (value) {
        this.doSearch();
      }
    });
  }

  view(id?: any): void {
    // this.showDialog(ManagerTeamComponent, {
    //   data: {
    //     id,
    //   },
    //   width: '70vw',
    //   height:'80vh',
    //   // maxHeight: '90vh',
    //   disableClose: false
    // }, (value) => {
    //   if (value) {
    //     this.doSearch();
    //   }
    // });
  }

  onStatusChange(e?: any) {
    this.searchModel = {
      page: 0,
      pageSize: 3,
      status: e.value
    };
    this.processSearch(this.searchModel);
  }


  getPanelInfo(id: string): any {
    return this.searchResult.data.find(panel => panel.id === id);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  emitEvent(type: string, gr: any): void {
    if (type === 'edit') {
      this.addOrEdit(gr.id);
    }
    else if (type === 'view') {
      this.view(gr.id);
    }
    else {
      this.deleteConfirmDialog(gr.id);
    }
  }

  deleteConfirmDialog(id?: any): any {
    this.showDialog(ConfirmDialogComponent, {}, (value) => {
      if (value) {
        this.delete(id);
      }
    });
  }

  delete(id: any): void {
    this.teamService.delete(id).subscribe((res) => {
      if (res.code === '00') {
        this.showSnackBar('Xóa thành công', 'success');
        this.searchModel.page = 0;
        this.processSearch(this.searchModel, () => this.callback());
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }

  callback(): void {
    this.listTeam = this.searchResult.data;
    if (this.listTeam.length > 0) {
      this.goToTeam(this.listTeam[0].id);
    }
  }

  /**
 * Set the theme on the config
 *
 * @param viewType
 */
  setView(viewType: ViewType): void {
    this._fuseConfigService.config = { viewType };
    this.team = 'team';
  }
}
