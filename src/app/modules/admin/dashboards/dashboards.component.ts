import {Component, Injector, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {BaseComponent} from '@core/base.component';
import {ProjectStaffEffortComponent} from '@shared/components/project-staff-effort/project-staff-effort.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private dashboardService: DashboardService,private router: Router) {
      super(injector,dashboardService);
  }

  ngOnInit(): void {
  }

  viewProject() {
      // this.showDialog(ProfileUserComponent, {
      //     width: '60vw',
      //     height: '85vh',
      //     disableClose: true
      //   }
      // );
      this.router.navigateByUrl('/dashboards/profile-dashboards');
  }

}
