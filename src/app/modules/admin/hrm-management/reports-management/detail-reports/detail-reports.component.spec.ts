import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportsComponent } from './detail-reports.component';

describe('DetailReportsComponent', () => {
  let component: DetailReportsComponent;
  let fixture: ComponentFixture<DetailReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
