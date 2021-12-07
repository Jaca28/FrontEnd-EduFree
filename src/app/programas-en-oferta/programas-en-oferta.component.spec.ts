import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasEnOfertaComponent } from './programas-en-oferta.component';

describe('ProgramasEnOfertaComponent', () => {
  let component: ProgramasEnOfertaComponent;
  let fixture: ComponentFixture<ProgramasEnOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramasEnOfertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramasEnOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
