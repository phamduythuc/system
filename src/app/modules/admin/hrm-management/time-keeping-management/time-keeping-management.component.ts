import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';

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
  constructor(injector: Injector,) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  importFile(){
    alert('h')
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
