import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "@core/base.component";
import {MatDrawer} from "@angular/material/sidenav";
import {debounceTime, fromEvent, Subject} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {TeamManagementService} from "./team-management.service";
import {AddOrEditTeamComponent} from "./add-or-edit-team/add-or-edit-team.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.scss']
})
export class TeamManagementComponent extends BaseComponent implements OnInit {


  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  selectedTeamId: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  formSearch =this.fb.group({
    text : ''
  });

  constructor(injector:Injector,public teamService: TeamManagementService, fb: FormBuilder) {
    super(injector, teamService)
  }

  ngOnInit(): void {
    this.searchModel.pageSize = 9999999
    this.formSearch.get('text').valueChanges.pipe(
      map(event=>{
        return event;
      }),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      res=> {
        console.log(res)
      }
    )
    this.searchModel.status=1
    this.processSearch(this.searchModel)
  }

  doSearch() {
    this.processSearch(this.searchModel)
  }



  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  goToTeam(id: any): void
  {
    this.selectedTeamId = id;

    // Close the drawer on 'over' mode
    if ( this.drawerMode === 'over' )
    {
      this.drawer.close();
    }
  }

  addOrEdit(id?: any): void {
    const ref = this.showDialog(AddOrEditTeamComponent, {
      data: {
        id,
      },
      width: '80vw',
      height: '80vh',
      disableClose: true
    }, (value) => {
      if (value)
        this.doSearch()
    });
  }

  getPanelInfo(id: string): any
  {
    return this.searchResult.data.find(panel => panel.id === id);
  }

  trackByFn(index: number, item: any): any
  {
    return item.id || index;
  }

  emitEvent(type: string, gr: any) {
    if(type === 'edit'){
      this.addOrEdit(gr.id);
    }else {
      this.delete(gr.id)
    }
  }
}
