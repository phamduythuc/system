import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { ImportFileTimeKeepingComponent } from './import-file-time-keeping/import-file-time-keeping.component';

@Component({
  selector: 'app-time-keeping-management',
  templateUrl: './time-keeping-management.component.html',
  styleUrls: ['./time-keeping-management.component.scss']
})
export class TimeKeepingManagementComponent extends BaseComponent implements OnInit {

  _permissionCodeName = 'DSNV';
  formSearch = this.fb.group({
    keyword: [''],
    option: ['1']
  });
  constructor(injector: Injector,public dialog: MatDialog) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  importFile(){
    this.dialog.open(ImportFileTimeKeepingComponent,{
      // height: '400px',
      width: '600px',
    });
  }

  onStatusChange(e?: any) {
    this.searchModel = {
      page: 0,
      pageSize: 3,
      status: e.value
    };
    this.processSearch(this.searchModel);
  }

}
