import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {MatDrawer} from '@angular/material/sidenav';
import {debounceTime, Subject} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {TeamManagementService} from '@shared/services/team-management.service';
import {AddOrEditTeamComponent} from './add-or-edit-team/add-or-edit-team.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfirmDialogComponent} from '@shared/components/confirm-dialog/confirm-dialog.component';

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

  listTeam: any[] = [];

  constructor(injector: Injector, public teamService: TeamManagementService, fb: FormBuilder) {
    super(injector, teamService);
    this.formSearch  = this.fb.group({
      text: ''
    });
  }

  ngOnInit(): void {
    this.searchModel.pageSize = 9999999;
    this.formSearch.get('text').valueChanges.pipe(
      map(event => event),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      res => {
        this.listTeam = this.searchResult.data.filter(item => {
          if (item.name.includes(res)){
            return item;
          }
        });
      }
    );
    this.searchModel.status = 1;
    this.processSearch(this.searchModel, () => this.callback());
  }

  doSearch(): void {
    this.processSearch(this.searchModel, () => this.callback());
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
      width: '70vw',
      // maxHeight: '90vh',
      disableClose: true
    }, (value) => {
      if (value) {
        this.doSearch();
      }
    });
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
    } else {
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
}
