import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {functions} from "lodash-es";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() rows: any = [];
  @Input() columns: IColumn[] | undefined = [];
  @Input() limit: any = 10;
  @Input() count: any = 0;
  @Input() columnWidth: string;
  @Input() paginate: boolean = true;
  @Input() actionTemplate: TemplateRef<any>;
  @Input() rowTemplate: TemplateRef<any>;
  @Output() pageChange = new EventEmitter<any>();


  get displayedColumns() {
    return this.columns.map(c => c.columnDef);
  }

  constructor(private cdk: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  changePage(e: any) {
    this.pageChange.emit(e);
  }

  calcColumnWidth(column: any) {
    if (this.columnWidth) {
      return this.columnWidth;
    }
    const totalFlex = this.columns?.reduce((total, col) => (col.flex ?? 1) + total, 0);
    return (column.flex ?? 1) / totalFlex + '%';
  }


  getRowIndex(row: any) {
    return this.rows.indexOf(row);
  }
}

export interface IColumn {
  columnDef?: string;
  header?: string;
  cellRenderer?: any;
  flex?: number;
}
const actions = [
  {
    id: 'delete',
    label: 'Delete',
    icon: 'heroicons_outline:trash',
    color: 'red'
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: 'heroicons_outline:pencil-alt',
    color: 'orange'
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
    id: 'view',
    label: 'View',
    icon: 'heroicons_outline:eye',
    color: 'primary',
  }
]
