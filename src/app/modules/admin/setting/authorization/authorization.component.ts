import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {BaseComponent} from '../../../../core/base.component';
import {forkJoin, Subject} from 'rxjs';
import {AddOrEditAuthComponent} from './add-or-edit-auth/add-or-edit-auth.component';
import {MenuTreeComponent} from './menu-tree/menu-tree.component';
import {AuthorizationService} from '@shared/services/authorization.service';
import {ConfirmDialogComponent} from "@shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('menuChild') child: MenuTreeComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  listRole: any = [];
  selectedModule = null;
  selectedPermission = null;

  selectedRole: any;
  roles: any;
  selectedRoleId: any | boolean;

  itemPermissions: any;

  constructor(injector: Injector, public cdk: ChangeDetectorRef, public authorizationService: AuthorizationService) {
    super(injector, authorizationService);
    this.searchModel.pageSize = 9999;
  }

  ngOnInit(): void {
    this.getListRole();
  }


  getListRole() {
    this.processSearch(this.searchModel, () => {
      this.roles = this.searchResult.data;
      this.selectedRoleId = this.roles[0].roleId;
    })
  }

  submitPermission() {
  }

  addOrEditRole(role?: any) {
    this.showDialog(AddOrEditAuthComponent, {
      data: {
        roleData: role
      },
      width: '50vw'
    }, value => {
      this.getListRole();
    });
  }

  ngOnDestroy(): void {
    // this.forkJoinSubscription.unsubscribe();
  }

  goToRole(id) {
    this.selectedRoleId = id;
  }

  saveMenu() {
    this.child.saveMenu();
  }

  deleteConfirmDialog(id?: any): any {
    this.showDialog(ConfirmDialogComponent, {}, (value) => {
      if (value) {
        this.delete(id);
      }
    });
  }

  delete(id: any): void {
    this.authorizationService.delete(id).subscribe((res) => {
      if (res.code === '00') {
        this.showSnackBar('Xóa thành công', 'success');
        this.getListRole();
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }
}
