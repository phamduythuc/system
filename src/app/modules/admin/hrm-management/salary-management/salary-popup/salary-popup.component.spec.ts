import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPopupComponent } from './salary-popup.component';

describe('SalaryPopupComponent', () => {
  let component: SalaryPopupComponent;
  let fixture: ComponentFixture<SalaryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
