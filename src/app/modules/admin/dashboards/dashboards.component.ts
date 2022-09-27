import {Component, Injector, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {BaseComponent} from "../../../core/base.component";

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private dashboardService: DashboardService) {
      super(injector);
  }

  ngOnInit(): void {
  }

}
