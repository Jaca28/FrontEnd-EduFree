import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProgramasComponent } from './admin-programas.component';

describe('AdminProgramasComponent', () => {
  let component: AdminProgramasComponent;
  let fixture: ComponentFixture<AdminProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProgramasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
