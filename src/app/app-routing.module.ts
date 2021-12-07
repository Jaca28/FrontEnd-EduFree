import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAsignaturasComponent } from './admin-asignaturas/admin-asignaturas.component';
import { AdminProgramasComponent } from './admin-programas/admin-programas.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { GruposComponent } from './grupos/grupos.component';
import { LoginComponent } from './login/login.component';
import { ProgramasEnOfertaComponent } from './programas-en-oferta/programas-en-oferta.component';
import { RegistroDeUsuarioComponent } from './registro-de-usuario/registro-de-usuario.component';
import { UsuariosPorGrupoComponent } from './usuarios-por-grupo/usuarios-por-grupo.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'programas-en-oferta', component: ProgramasEnOfertaComponent
  },
  {
    path: 'admin-usuarios', component: AdminUsuariosComponent
  },
  {
    path: 'admin-programas', component: AdminProgramasComponent
  },
  {
    path: 'admin-asignaturas', component: AdminAsignaturasComponent
  },
  {
    path: 'grupos', component: GruposComponent
  },
  {
    path: 'usuarios-por-grupo', component: UsuariosPorGrupoComponent
  },
  {
    path: 'registro-de-usuario', component: RegistroDeUsuarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
