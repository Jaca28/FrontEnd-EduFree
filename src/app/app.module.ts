import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProgramasEnOfertaComponent } from './programas-en-oferta/programas-en-oferta.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminProgramasComponent } from './admin-programas/admin-programas.component';
import { AdminAsignaturasComponent } from './admin-asignaturas/admin-asignaturas.component';
import { GruposComponent } from './grupos/grupos.component';
import { UsuariosPorGrupoComponent } from './usuarios-por-grupo/usuarios-por-grupo.component';
import { RegistroDeUsuarioComponent } from './registro-de-usuario/registro-de-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProgramasEnOfertaComponent,
    AdminUsuariosComponent,
    AdminProgramasComponent,
    AdminAsignaturasComponent,
    GruposComponent,
    UsuariosPorGrupoComponent,
    RegistroDeUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
