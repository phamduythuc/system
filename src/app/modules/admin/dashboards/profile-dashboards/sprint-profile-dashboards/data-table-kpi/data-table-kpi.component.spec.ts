import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableKpiComponent } from './data-table-kpi.component';

describe('DataTableKpiComponent', () => {
  let component: DataTableKpiComponent;
  let fixture: ComponentFixture<DataTableKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
