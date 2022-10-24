import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TreeviewComponent, TreeviewConfig, TreeviewItem, TreeviewHelper, DownlineTreeviewItem} from "ngx-treeview";
import {AuthorizationService} from "../authorization.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {isNil, remove, reverse} from "lodash";

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss'],
})
export class MenuTreeComponent implements OnInit {
  @Output() selectMenuItem = new EventEmitter<any>();
  dropdownEnabled = true;
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    // hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: true,
    maxHeight: 400
  });
  listPermissions: any
  targetPermission: any

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

  items: any;

  simpleItems = {
    text: 'parent-1',
    value: 'p1',
    children: [
      {
        text: 'child-1',
        value: 'c1'
      }, {
        text: 'child-2',
        value: 'c2',
        children: [
          {
            text: 'child-1-2',
            value: 'c12'
          },
          {
            text: 'child-1-2',
            value: 'c12',
            // disabled: true,
            collapsed: true,
            checked: true,
            children: [
              {
                text: 'child-1-2',
                value: 'c12'
              },
              {
                text: 'child-1-2',
                value: 'c12'
              }
            ]
          }
        ]
      },
    ]
  };

  simpleItems2 = {
    text: 'parent-2',
    value: 'p2',
    collapsed: true,
    children: [
      {
        text: 'child-1',
        value: 'c1'
      },
      {
        text: 'child-2',
        value: 'c2',
        children: [
          {
            text: 'child-1-2',
            value: 'c12'
          },
          {
            text: 'child-1-2',
            value: 'c12',
            // disabled: true,
            collapsed: true,
            checked: true,
            children: [
              {
                text: 'child-1-2',
                value: 'c12'
              },
              {
                text: 'child-1-2',
                value: 'c12'
              }
            ]
          }
        ]
      },
    ]
  };
  listPermissionsCover: any[];
  rows: any[];

  constructor(private service: AuthorizationService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // this.items  = this.getItems([this.simpleItems,this.simpleItems2])
    this.getMenu()
  }

  getItems(parentChildObj) {
    let itemsArray = [];
    parentChildObj.forEach(set => {
      itemsArray.push(new TreeviewItem(set))
    });
    console.log(itemsArray)
    return itemsArray;
  }

  onFilterChange($event: string) {
    console.log($event)
  }

  getMenu(id?) {
    this.service.getMenus(id).subscribe(res => {
      console.log(res);
      if (res.code === '00') {
        const data = res.data.menus
        this.getListPermissions(data)
        this.items = this.getItems(data)
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
      if (item.permissions) {
        itemsArray.push({code: item.code, permissions: item.permissions})
      }
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
        const nodePermissions = this.listPermissions.find(el=>el.code===item.value)
        const ele = {
          name: item.text,
          code: item.value,
          permissions:nodePermissions&&nodePermissions.permissions||[],
          checked: item.internalChecked,
          collapsed: item.internalCollapsed,
          children: this.handleCoverDataTreeToPut(item.internalChildren || [],)
        }
        a.push(ele)
      })
    } else {
      return []
    }
    console.log(a)
    console.log(this.listPermissions)
    return a
  }

  showSnackBar(messages?: string, type?: string): void {
    this.snackBar.open(messages, null, {
      panelClass: type === 'success' ? 'bg-lime-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
    });
  }

  selectChildren(item: any) {
    this.targetPermission = this.listPermissions.find(i => i.code === item.value)
    this.selectMenuItem.emit(this.targetPermission)
  }

  onCheckedChangei(tree: any, node) {
    console.log(tree)
    console.log(node)
    console.log(TreeviewHelper.findParent(this.items, node))
  }

  onSelectedChange(downlineItems: DownlineTreeviewItem[], e): void {
    // this.rows = [];
    // console.log(downlineItems)
    // downlineItems.forEach(downlineItem => {
    //   const item = downlineItem.item;
    //   const value = item&&item.value;
    //   const texts = [item&&item.text];
    //   let parent = downlineItem.parent;
    //   while (!isNil(parent)) {
    //     texts.push(parent.item.text);
    //     parent = parent.parent;
    //   }
    //   const reverseTexts = reverse(texts);
    //   const row = `${reverseTexts.join(' -> ')} : ${value}`;
    //   this.rows.push(row);
    // console.log(downlineItems)
    // console.log(e)
    // this.handleCoverDataTreeToPut(e)
    // });
  }


  toggleNavigation(items: any) {
    this.handleCoverDataTreeToPut(items)
    console.log(items);
  }

  saveMenu() {

  }
}
