import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerEditRoleComponent } from './handler-edit-role.component';

describe('HandlerEditRoleComponent', () => {
  let component: HandlerEditRoleComponent;
  let fixture: ComponentFixture<HandlerEditRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandlerEditRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlerEditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
