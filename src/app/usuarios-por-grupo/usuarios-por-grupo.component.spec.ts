import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosPorGrupoComponent } from './usuarios-por-grupo.component';

describe('UsuariosPorGrupoComponent', () => {
  let component: UsuariosPorGrupoComponent;
  let fixture: ComponentFixture<UsuariosPorGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosPorGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosPorGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
