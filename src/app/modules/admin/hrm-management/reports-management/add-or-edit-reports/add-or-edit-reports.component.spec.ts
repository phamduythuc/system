import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditReportsComponent } from './add-or-edit-reports.component';

describe('AddOrEditReportsComponent', () => {
  let component: AddOrEditReportsComponent;
  let fixture: ComponentFixture<AddOrEditReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
