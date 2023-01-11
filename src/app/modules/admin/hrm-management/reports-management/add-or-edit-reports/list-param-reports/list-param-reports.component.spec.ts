import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParamReportsComponent } from './list-param-reports.component';

describe('ListParamReportsComponent', () => {
  let component: ListParamReportsComponent;
  let fixture: ComponentFixture<ListParamReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParamReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParamReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
