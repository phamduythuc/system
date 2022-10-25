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
import {SettingService} from '../setting.service';
import {forkJoin, Subject} from 'rxjs';
import {AddOrEditAuthComponent} from './add-or-edit-auth/add-or-edit-auth.component';
import {MenuTreeComponent} from "./menu-tree/menu-tree.component";
import {AuthorizationService} from "./authorization.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('matDrawer') matDrawer : any
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  listRole: any = [];
  selectedModule = null;
  selectedPermission = null;
  selectedRole: any;

  paginate: any = {
    authorityId: 1
  };

  modules = [];
  permission = [];
  selectAll = false;
  forkJoinSubscription: any;

  listPermissionChange: any[] = [];
  listModuleChange = [];
  roles: any;
  selectedRoleId: any | boolean;
  itemPermissions: any;

  @ViewChild('menuChild') child: MenuTreeComponent;

  menus: any[] = [];

  constructor(injector: Injector, public settingService: SettingService, public cdk: ChangeDetectorRef, public authorizationService : AuthorizationService) {
    super(injector,authorizationService);
    this.searchModel.pageSize = 9999
  }

  ngOnInit(): void {
    this.initData();
    this.getListRole()
  }

  initData() {

  }

  getPermissionById() {
    // this.settingService.getPermissionByAuthorityId(this.paginate).subscribe(res => {
    //     this.handlePermissionResponse(res);
    //     this.checkSelectAllPermission();
    //     this.listPermissionChange = [];
    //     this.listModuleChange = [];
    //     this.selectNode(this.selectedModule);
    // });
    // this.listPermissionChange = [this.selectedPermission];
  }

  handleModuleResponse(res): void {
    if (res?.status === 200) {
      this.modules = res.body.results;
      this.selectedModule = this.modules[0];
    }
  }

  handlePermissionResponse(res): void {
    if (res?.status === 200) {
      this.permission = res.body.results;
      this.selectedPermission = this.permission.find(p => p.moduleId === this.selectedModule.moduleId)?.permissions;
    }
  }

  handleRoleResponse(res) {
    if (res?.status === 200) {
      this.listRole = res.body.results;
    }
  }

  getListRole() {
    this.processSearch(this.searchModel,()=>{
      this.roles= this.searchResult.data;
      this.selectedRoleId = this.roles[0].roleId;
    })
  }

  addPermissionTemp(per: any) {
    per.forEach(item => {
      this.listPermissionChange.push(item);
    });
  }

  checkSelectAllPermission() {
    if (this.selectedPermission) {
      const child = this.selectedPermission.filter(item => {
        if (item.permissionChild?.length > 0) {
          return item.permissionChild;
        }
      });
      if ((this.selectedPermission.filter(item => item.value === '0').length > 0 || child.filter(item => item.value === '0').length > 0)) {
        this.selectAll = false;
      } else {
        this.selectAll = true;
      }
    }
  }

  selectNode(data: any) {
    // this.checkSelectAllPermission();
    this.selectAll = false;
    this.listModuleChange.push(data);
    this.selectedPermission = this.permission.find(p => p.moduleId === data.moduleId)?.permissions;
    this.addPermissionTemp(this.selectedPermission);
    this.checkSelectAllPermission();
  }

  changeSelectedAll($event: any) {
    this.selectAll = $event.checked;
  }

  changeCheck(e: any) {
    if (e) {
      this.checkSelectAllPermission();
    }
  }

  submitPermission() {
    // const per = this.listPermissionChange.filter((permission, index, self) => {
    //     return index === self.findIndex(item => item.id === permission.id);
    // });
    // const permissionChecked = per.filter(p => p.value === '1');
    // const mod = this.listModuleChange.filter((module, index, self)=>{
    //     return index === self.findIndex(item =>item.moduleId === module.moduleId);
    // });
    // const data = {
    //     modules: mod,
    //     permissions: permissionChecked
    // };
    // console.log(this.selectedPermission);
    // // const data = {...this.selectedModule, permissions: permissionChecked};
    // this.settingService.updateModuleGroup(data, this.paginate.authorityId).subscribe(res => {
    //     this.showSnackBar('Cập nhật thành công', 'success');
    //     this.getPermissionById();
    // });
  }

  addOrEditRole(role?: any) {
    this.showDialog(AddOrEditAuthComponent, {
      data: {
        role
      },
      width: '50vw'
    }, value => {
      this.getListRole();
    });
  }

  choseRole() {
    this.paginate.authorityId = this.selectedRole.id;
    this.getPermissionById();
    this.cdk.detectChanges();
  }

  ngOnDestroy(): void {
    // this.forkJoinSubscription.unsubscribe();
  }

  goToRole(id) {
    this.selectedRoleId = id;
    console.log(this.selectedRoleId)
  }

  emitEvent(edit: string, role: any) {

  }

  getMenuItemPermissions(e) {
    console.log(e)
    // this.drawerOpened=true
    this.matDrawer.open()
    this.itemPermissions = e.permissions
  }

  show(permission: any[],sfa) {
    console.log(permission)

    console.log(sfa)
  }

  saveMenu() {
    this.child.saveMenu()
  }
}
