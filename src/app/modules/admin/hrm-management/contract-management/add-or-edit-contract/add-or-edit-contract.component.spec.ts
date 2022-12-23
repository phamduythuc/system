import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditContractComponent } from './add-or-edit-contract.component';

describe('AddOrEditContractComponent', () => {
  let component: AddOrEditContractComponent;
  let fixture: ComponentFixture<AddOrEditContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
