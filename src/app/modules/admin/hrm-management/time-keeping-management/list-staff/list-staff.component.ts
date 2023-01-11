import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { StaffService } from '@shared/services/staff.service';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.scss']
})
export class ListStaffComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector,
    public staffService: StaffService,) {
    super(injector, staffService);
  }

  ngOnInit(): void {
    this.doSearch()
  }

  doSearch() {
    this.searchModel = {
      ...this.searchModel,
      page: 0,
      // ...this.formSearch.value,
    };
    this.processSearch(this.searchModel);
  }

}
