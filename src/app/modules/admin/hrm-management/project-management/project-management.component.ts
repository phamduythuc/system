import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "@core/base.component";
import {ProjectManagementService} from "./project-management.service";
import {IColumn} from "@layout/common/data-table/data-table.component";
import {CommonUtilsService} from "@shared/common-utils.service";
import {AddOrEditProjectComponent} from "./component/add-or-edit-project/add-or-edit-project.component";
import {DetailProjectComponent} from "./component/detail-project/detail-project.component";

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent extends BaseComponent implements OnInit {
  _permissionCodeName = 'DSDA';

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'name',
      header: 'common.name',
      flex: 0.3,
    },
    {
      columnDef: 'code',
      header: 'common.code',
      flex: 0.3,
    },
    {
      columnDef: 'projectTypeName',
      header: 'hrm-management.project.form.projectType',
    },
    {
      columnDef: 'budget',
      header: 'hrm-management.project.form.budget',
    },
    {
      columnDef: 'startTime',
      header: 'hrm-management.project.form.startTime',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.startTime))
    },
    {
      columnDef: 'expectEndTime',
      header: 'hrm-management.project.form.expectEndTime',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.expectEndTime))
    },
    {
      columnDef: 'actualEndTime',
      header: 'hrm-management.project.form.actualEndTime',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.actualEndTime))
    },
    // {
    //   columnDef: 'parentName',
    //   header: 'common.parent',
    // },
    {
      columnDef: 'partnerName',
      header: 'common.partner',
    },
    // {
    //   columnDef: 'status',
    //   header: 'common.status',
    //   cellRenderer: (element: any) => (this.translocoService.translate(element.status===1?'common.active':'common.notActive'))
    //
    // },
    {
      columnDef: 'action',
      header: 'common.actions',
      actions: [ 'view','edit', 'delete'],
    }
  ];
  formSearch = this.fb.group({
    name: [''],
  })

  paginate = {
    page: 0,
    size: 10,
    total: 0
  };
  panelOpenState: false;

  constructor(injector: Injector, public projectService: ProjectManagementService) {
    super(injector, projectService)
  }

  ngOnInit(): void {
    this.searchModel.status = 1
    this.doSearch();
  }

  doSearch() {
    this.searchModel = {...this.searchModel, ...this.formSearch.value}
    this.processSearch(this.searchModel)
  }
  actionClick(e: any): void {
    console.log(e.type)
    if (e.type === 'view') {
      this.showDetail(e.data.id)
    }
    if (e.type === 'edit') {
      this.addOrEdit(e.data.id)
    }
    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id)
    }
  }

  showDetail(id){
    this.showDialog(DetailProjectComponent, {
        data: {
          id
        },
        width: '60vw',
        // height: '55vh',
        disableClose: true
      }
    )
  }

  addOrEdit(id?: any): void {
    const ref = this.showDialog(AddOrEditProjectComponent, {
      data: {
        id,
        projects:this.searchResult.data
      },
      width: '60vw',
      // height: '64vh',
      disableClose: true
    }, (value) => {
      if (value)
        this.doSearch()
    });
  }
}
