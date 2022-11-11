import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() roleName: string;
  @Input() rows: any = [];
  @Input() columns: IColumn[] | undefined = [];
  @Input() limit: any = 10;
  @Input() count: any = 0;
  @Input() columnWidth: string;
  @Input() paginate: boolean = true;
  @Input() actionTemplate: TemplateRef<any>;
  @Input() rowTemplate: TemplateRef<any>;
  @Output() pageChange = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();
  actions = [
    {
      id: 'delete',
      label: 'Delete',
      icon: 'heroicons_outline:trash',
      color: 'success',
      role: 'DELETE'
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'heroicons_outline:trash',
      color: 'red',
      role: 'DELETE'
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: 'heroicons_outline:pencil-alt',
      color: 'orange',
      role: 'UPDATE'
    },
    {
      id: 'lock',
      label: 'Lock',
      icon: 'heroicons_outline:lock-closed',
      color: 'red',
    },
    {
      id: 'resetPassword',
      label: 'Reset Password',
      icon: 'heroicons_outline:refresh',
      color: 'red',
    },
    {
      id: 'configEffort',
      label: this.transloco.translate('Giai đoạn'),
      icon: 'heroicons_outline:plus-circle',
      color: 'green',
      role: 'CREATE'
    },
    {
      id: 'view',
      label: 'View',
      icon: 'heroicons_outline:eye',
      color: 'primary',
      role: 'READ'
    }
  ];
  displayedActions = [];
  displayedInput = [];

  get displayedColumns(): any {
    return this.columns.map(c => c.columnDef);
  }

  constructor(private cdk: ChangeDetectorRef, private transloco: TranslocoService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.getListActions();
  }

  changePage(e: any): void {
    this.pageChange.emit(e);
  }

  calcColumnWidth(column: any): any {
    if (this.columnWidth) {
      return this.columnWidth;
    }
    const totalFlex = this.columns?.reduce((total, col) => (col.flex ?? 1) + total, 0);
    return (column.flex ?? 1) / totalFlex + '%';
  }


  getRowIndex(row: any): any {
    return this.rows.indexOf(row);
  }

  getListActions(): any {
    this.displayedActions = this.columns
      ?.find(col => col.columnDef === 'action')
      ?.actions?.map(act => this.actions.find(a => a.id === act));
  }

  emitAction(actionType: any, rowData: any): void {
    const data = {
      type: actionType,
      data: rowData,
    };
    this.action.emit(data);
  }

  log(row) {
    console.log(row);
  }
}

export interface IColumn {
  actions?: any;
  columnDef?: string;
  header?: string;
  cellRenderer?: any;
  flex?: number;
}
