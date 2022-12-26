import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerAddRoleComponent } from './handler-add-role.component';

describe('HandlerAddRoleComponent', () => {
  let component: HandlerAddRoleComponent;
  let fixture: ComponentFixture<HandlerAddRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandlerAddRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlerAddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
