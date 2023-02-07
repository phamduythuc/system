/* eslint-disable @typescript-eslint/naming-convention */
import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {ProjectService} from '@shared/services/project.service';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {CommonUtilsService} from '@shared/common-utils.service';
import {AddOrEditProjectComponent} from './add-or-edit-project/add-or-edit-project.component';
import {DetailProjectComponent} from './detail-project/detail-project.component';
import {ProjectEffortComponent} from './project-effort/project-effort.component';
import {ProjectMemberComponent} from './project-member/project-member.component';

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
      header: 'common.name_project',
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
      header: 'hrm-management.project.form.estimates',
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
      actions: [ 'configEffort', 'view','edit', 'delete'],
    }
  ];
  formSearch = this.fb.group({
    keyword: [''],
  });

  paginate = {
    page: 0,
    size: 10,
    total: 0
  };
  panelOpenState: boolean = false;

  list_status = [];

  typeStatus = '1';

  constructor(injector: Injector, public projectService: ProjectService) {
    super(injector, projectService);
    this.list_status = JSON.parse(localStorage.getItem('listType')).LIST_STATUS;

  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    this.doSearch();
  }

  // doSearch() {
  //   this.searchModel = {...this.searchModel, page: 0, ...this.formSearch.value};
  //   this.processSearch(this.searchModel);
  // }
  doSearch() {
    this.searchModel = {
      ...this.searchModel,
      page: 0,
      ...this.formSearch.value,
    };
    this.processSearch(this.searchModel, () => {
      // const VND = new Intl.NumberFormat('vi-VN', {
      //   style: 'currency',
      //   currency: 'VND',
      // });

      let convertData = this.searchResult.data.map((obj) => {
        let convetSalary = {
          ...obj,
          budget: CommonUtilsService.formatVND(parseInt(obj.budget)),
        };
        return convetSalary;
      });
      this.searchResult.data = convertData;

      this.searchResult.data.map((item) => {
        return item.documentName;
      });
    });
  }

  actionClick(e: any): void {
    if (e.type === 'configEffort') {
      this.showConfigEffort(e.data.id);
      return;
    }
    if (e.type === 'view') {
      this.showDetail(e.data.id);
      return;
    }
    if (e.type === 'edit') {
      this.addOrEdit(e.data.id);
      return;
    }
    if (e.type === 'delete') {
      this.deleteConfirmDialog(e.data.id);
      return;
    }

    if (e.type === 'add_member') {
      this.openPopupAddMember(e.data.id);
    }
  }

  showConfigEffort(id){
    this.showDialog(ProjectEffortComponent, {
        data: {
          id
        },
        width: '60vw',
        height: '85vh',
        disableClose: true
      }
    );
  }

  showDetail(id){
    this.showDialog(DetailProjectComponent, {
        data: {
          id
        },
        width: '60vw',
        height: '85vh',
        disableClose: true
      }
    );
  }

  addOrEdit(id?: any): void {
    this.showDialog(AddOrEditProjectComponent, {
      data: {
        id,
        projects:this.searchResult.data
      },
      width: '60vw',
      maxHeight: '90vh',
      disableClose: true
    }, (value) => {
      if (value) {
        this.doSearch();
      }
    });
  }


  openPopupAddMember(id){
    this.showDialog(ProjectMemberComponent, {
        data: {
          id
        },
        width: '60vw',
        height: '85vh',
        disableClose: true
      }
    );
  }

  filterStatus(data){
    if(data){
      this.searchModel.status = Number(data);
    }else{
    this.searchModel.status = '';
    }
    this.doSearch();

  }
}