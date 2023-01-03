import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
import {MaskCurrencyDirective} from './mask-currency.directive'

@Component({
  selector: 'app-data-table-kpi',
  templateUrl: './data-table-kpi.component.html',
  styleUrls: ['./data-table-kpi.component.scss']
})
export class DataTableKpiComponent implements OnInit {
  @Input() roleName: string;
  @Input() rows: any = [];
  @Input() columns: any;
  @Input() limit: any = 10;
  @Input() pageIndex: any = 0;
  @Output() pageIndexChange = new EventEmitter<any>();
  @Input() count: any = 0;
  @Input() columnWidth: string;
  @Input() paginate: boolean = true;
  @Input() actionTemplate: TemplateRef<any>;
  @Input() rowTemplate: TemplateRef<any>;
  @Output() pageChange = new EventEmitter<any>();
  @Output() callback = new EventEmitter<any>();
  get displayedColumns(): any {
    return this.columns.map((c) => c.columnDef);
  }
  
  dataSource = new MatTableDataSource(this.rows);
  dataSourceWithPageSize = new MatTableDataSource(this.rows);
  form: FormGroup;
  constructor(public fb :FormBuilder) {
    // this.form=fb.group({
    //   currency:['']
    // });
    // this.onChanges();
  }

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;

  pageSizes = [3, 5, 7];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
  }
    

  ngOnChanges(changes: SimpleChanges): void {
    this.reLoadData()
  }

  ngOnInit(): void {}

  getRowIndex(row: any): any {
    return this.rows.indexOf(row);
  }

  reLoadData() {
    this.dataSource = new MatTableDataSource(this.rows);
    this.dataSourceWithPageSize = new MatTableDataSource(this.rows);
    this.dataSource.paginator = this.paginator;
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
  }

  change(){
    this.callback.emit(this.rows)
  }
  onChanges(): void {
    this.form.valueChanges.subscribe(() => {
      console.log(this.form.value)
    });
 }
  
}
