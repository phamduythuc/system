import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {TranslocoService} from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class PaginatorI18nService {
  paginatorIntl = new MatPaginatorIntl();

  constructor(private translate: TranslocoService) {
    this.translate.langChanges$.subscribe(() => this.getPaginatorIntl());
  }

  getPaginatorIntl(): MatPaginatorIntl {
    this.paginatorIntl.itemsPerPageLabel = this.translate.translate('paging.visible');
    this.paginatorIntl.previousPageLabel = this.translate.translate('paging.previous');
    this.paginatorIntl.nextPageLabel = this.translate.translate('paging.next');
    this.paginatorIntl.firstPageLabel = this.translate.translate('paging.first_page');
    this.paginatorIntl.lastPageLabel = this.translate.translate('paging.last_page');
    this.paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);

    this.paginatorIntl.changes.next();

    return this.paginatorIntl;
  }

  private getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return 'paging.no_data';
    }
    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return this.translate.translate('paging.range_label', {startIndex: startIndex + 1, endIndex, length});
  }
}
