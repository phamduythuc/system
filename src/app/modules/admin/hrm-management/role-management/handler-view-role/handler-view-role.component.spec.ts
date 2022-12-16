import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerViewRoleComponent } from './handler-view-role.component';

describe('HandlerViewRoleComponent', () => {
  let component: HandlerViewRoleComponent;
  let fixture: ComponentFixture<HandlerViewRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandlerViewRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlerViewRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
