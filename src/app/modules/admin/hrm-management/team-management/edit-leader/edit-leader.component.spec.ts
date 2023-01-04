import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaderComponent } from './edit-leader.component';

describe('EditLeaderComponent', () => {
  let component: EditLeaderComponent;
  let fixture: ComponentFixture<EditLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
