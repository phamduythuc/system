import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerDeleteRoleComponent } from './handler-delete-role.component';

describe('HandlerDeleteRoleComponent', () => {
  let component: HandlerDeleteRoleComponent;
  let fixture: ComponentFixture<HandlerDeleteRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandlerDeleteRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlerDeleteRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
