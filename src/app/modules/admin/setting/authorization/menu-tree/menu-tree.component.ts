import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {TreeviewComponent, TreeviewConfig, TreeviewItem, TreeviewHelper, DownlineTreeviewItem} from 'ngx-treeview';
import {AuthorizationService} from '@shared/services/authorization.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {isNil, remove, reverse} from 'lodash';
import {data} from 'autoprefixer';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss'],
})
export class MenuTreeComponent implements OnInit, OnChanges {
  @Input() roleId;
  @ViewChild('matDrawer') matDrawer: any;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = false;
  dropdownEnabled = true;
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    // hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: true,
    maxHeight: 400
  });
  listPermissions: any;
  targetPermissions: any
  targetCode: any

  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];
  resultTreeData:any;
  items: any;

  listPermissionsCover: any[];
  rows: any[];
  private checkDisable: boolean;

  constructor(private authorizationService: AuthorizationService, private snackBar: MatSnackBar) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'roleId': {
            if (this.roleId) {
              this.matDrawer&&this.matDrawer.close()
              this.getMenu(this.roleId)
            }
          }
        }
      }
    }
    }

  ngOnInit(): void {
  }

  getItems(parentChildObj) {
    let itemsArray = [];
    parentChildObj.forEach(set => {
      itemsArray.push(new TreeviewItem(set))
    });
    // console.log(itemsArray)
    return itemsArray;
  }

  onFilterChange($event: string) {
    console.log($event)
  }

  getMenu(id?) {
    const data = {roleId:id}
    this.authorizationService.getMenus(data).subscribe(res => {
      // console.log(res);
      if (res.code === '00') {
        const data = res.data.menus
        this.resultTreeData = data
        this.getListPermissions(data)
        console.log(this.listPermissions)

        this.items = this.getItems(data)
        console.log(this.items)
      } else {
        this.showSnackBar(res.message, 'error');
      }
    })
  }

  getListPermissions(arr: any, result?: any[]) {
    let itemsArray = result || [];
    arr.forEach(item => {
      item.text = item.name;
      item.value = item.code;
      // item.name=item.name.toString()
      // if (item.permissions) {
        itemsArray.push({code: item.code,menuId:item.menuId,disable:!item.checked, permissions: item.permissions||[]})
      // }
      if (item.children) {
        this.getListPermissions(item.children, itemsArray)
      }
    })
    this.listPermissions = itemsArray
  }

  handleCoverDataTreeToPut(arr) {
    const a = []
    if (arr && arr.length > 0) {
      arr.forEach(item => {
        if(item.internalChecked!==false){
          const nodePermissions = this.listPermissions.find(el => el.code === item.value)
          const ele = {
            name: item.text,
            code: item.value,
            permissions: nodePermissions && this.handleFilterPermissionArrToPut(nodePermissions.permissions) || [],
            menuId: +(nodePermissions && nodePermissions.menuId),
            checked: item.internalChecked,
            collapsed: item.internalCollapsed,
            children: this.handleCoverDataTreeToPut(item.internalChildren || [],)
          }
          a.push(ele)
        }
      })
    } else {
      return []
    }
    return a
  }

  handleFilterPermissionArrToPut(arr){
    if(!arr) return

    return arr.filter(item=>item.action)
  }

  showSnackBar(messages?: string, type?: string): void {
    this.snackBar.open(messages, null, {
      panelClass: type === 'success' ? 'bg-lime-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
    });
  }

  selectChildren(item: any) {
    this.matDrawer.open()
    this.checkDisable =!item.checked
    this.targetPermissions = this.listPermissions.find(i => i.code === item.value)
    this.targetCode= this.targetPermissions&&this.targetPermissions.code
    console.log(this.targetPermissions)
    // this.selectMenuItem.emit(this.targetPermission)
  }

  onCheckedChangei(tree: any, node) {
    console.log(TreeviewHelper.findParent(this.items, node))
  }

  onSelectedChange(downlineItems: DownlineTreeviewItem[], e): void {
  }


  toggleNavigation() {
    this.handleCoverDataTreeToPut(this.items)
  }

  saveMenu() {
    this.handleCoverDataTreeToPut(this.items)
    const data= {
      roleId:+this.roleId,
      menus:this.handleCoverDataTreeToPut(this.items),
      // permissions: this.listPermissions
    }
    this.authorizationService.saveMenu(data).subscribe(res=>{
      if ('00' === res.code) {
        this.showSnackBar(res.message, 'success');
      } else {
        this.showSnackBar(res.message, 'error');
      }
    })
    console.log(data);
  }

  onCheckedChanged(checkInput: any,code) {
    if(this.targetCode===code) this.checkDisable= !checkInput.checked
  }
}
