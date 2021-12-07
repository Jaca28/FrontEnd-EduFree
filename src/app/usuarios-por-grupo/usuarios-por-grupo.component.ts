import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminUsuariosComponent } from '../admin-usuarios/admin-usuarios.component';
import { BackendService } from '../backend.service';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-usuarios-por-grupo',
  templateUrl: './usuarios-por-grupo.component.html',
  styleUrls: ['./usuarios-por-grupo.component.scss']
})
export class UsuariosPorGrupoComponent implements OnInit {

  listaUsuariosPorGrupo: any = [];

  listaUsuarios: any = [];

  listaNombresDeUsuarios: any = [];

  listaNombresDeUsuariosFinal: any = [];

  openModalCrear = false;

  openModalCalificar = false;

  formGroupUsuariosPorGrupo;

  modoFormulario = 'adicion';

  usuario='';

  id='';

  constructor(
    public servicioBackend: BackendService,
    private formBuilder: FormBuilder,
    private servicioSideBar: SidebarService
  ) {

    this.servicioSideBar.rutaActual = 'usuarios-por-grupo';
    this.obtenerUsuariosPorGrupo();

      this.formGroupUsuariosPorGrupo = this.formBuilder.group({

        usuarioId: ['', Validators.required],
        grupoId: ['', Validators.required],
        calificacion1: ['', Validators.required],
        calificacion2: ['', Validators.required],
        calificacion3: ['', Validators.required],
        
  
      });

    
   }

  ngOnInit(): void {
  };

  obtenerUsuariosPorGrupo(): void {
    this.servicioBackend.getRequest('usuario-por-grupos').subscribe(
      {
        next: (datos) => {

          //Función de obtener nombres de usuario y llenar lista de nombres de usuario
          this.listaUsuariosPorGrupo = datos;
          console.log(this.listaUsuariosPorGrupo.length)

          for(let i=0; i<this.listaUsuariosPorGrupo.length; i++){

            console.log(this.listaUsuariosPorGrupo[i])
            const Id = this.listaUsuariosPorGrupo[i].usuarioId;
            const IdConsulta = Id.toString();
            console.log(IdConsulta);
            this.obtenerUsuarios(i, IdConsulta);
            

          };

          
          this.listaNombresDeUsuariosFinal = this.listaNombresDeUsuarios;
          console.log("La lista de nombres es:")
          console.log(this.listaNombresDeUsuariosFinal);

        },
        error: (e) => {
          console.log(e);

          if (e.statusCode == 401) {
            this.servicioBackend.authorized = false;
          }

        },
        complete: () => {

        },


      })
  };

  crearUsuariosPorGrupo() {

    const usuariosPorGrupo = this.formGroupUsuariosPorGrupo.getRawValue();
    
    if(!usuariosPorGrupo.usuarioId){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo Id de Usuario',
        'warning'
      );
      return;
    }

    if(!usuariosPorGrupo.grupoId){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo Id de Grupo',
        'warning'
      );
      return;
    }
  
    this.servicioBackend.postRequest('usuario-por-grupos', JSON.stringify(usuariosPorGrupo)).subscribe(
      {
        next: (datos) => {
          this.listaUsuariosPorGrupo.push(usuariosPorGrupo);
          Swal.fire(
            'Que bien!',
            'Un Usuario ha sido agregado a un grupo',
            'success'
          );
          this.obtenerUsuariosPorGrupo();
        },
        error: (e) => {
          console.log(e);
          Swal.fire(
            'Error',
            'Lo sentimos el Usuario no ha sido agregado al grupo',
            'error'
          )
        },
        complete: () => {

        },

      }

    )
  };


  abrirFormulario(): void {
    this.openModalCrear = !this.openModalCrear;
  };

  entrarModoEdicion(usuariosPorGrupo: any): void {

    this.formGroupUsuariosPorGrupo.patchValue(usuariosPorGrupo);
    this.id = usuariosPorGrupo.id;
    this.openModalCrear = true;
    this.modoFormulario = 'edicion';
    this.openModalCalificar = false;

  };

  entrarModoCalificacion(usuariosPorGrupo: any): void {

    this.formGroupUsuariosPorGrupo.patchValue(usuariosPorGrupo);
    this.id = usuariosPorGrupo.id;
    this.openModalCrear = true;
    this.modoFormulario = 'edicion';
    this.openModalCalificar = true;

  };

  cambiarModoAdicion(): void {

    this.modoFormulario = 'adicion';
    this.openModalCrear = false;

  };


  editarUsuariosPorGrupo(): void {

    const usuariosPorGrupo = this.formGroupUsuariosPorGrupo.getRawValue();

    console.log(usuariosPorGrupo);

    this.servicioBackend.patchRequest('usuario-por-grupos', this.id, JSON.stringify(usuariosPorGrupo)).subscribe(
      {
        next: (datos) => {
          this.listaUsuariosPorGrupo.push(usuariosPorGrupo);
          Swal.fire(
            'Que bien!',
            'El usuario en el grupo ha sido editado',
            'success'
          );

          this.obtenerUsuariosPorGrupo();
        },
        error: (e) => {
          console.log(e);

          if (e.statusCode == 401) {
            Swal.fire(
              'Error',
              'Usuario no autorizado',
              'error'
            );
          } else {
            Swal.fire(
              'Error',
              'Lo sentimos el Usuario en el Grupo no ha sido editado',
              'error'
            )

          }

        },
        complete: () => {

        },


      }

    )

  };

  eliminarUsuariosPorGrupo(id: string): void {

    this.servicioBackend.deleteRequest('usuario-por-grupos', id).subscribe(
      {
        next: (datos) => {
          Swal.fire(
            'Que bien!',
            'El usuario en el Grupo ha sido eliminado',
            'success'
          );

          this.obtenerUsuariosPorGrupo();
        },
        error: (e) => {
          console.log(e);

          if (e.statusCode == 401) {
            Swal.fire(
              'Error',
              'Usuario no autorizado',
              'error'
            );
          } else {
            Swal.fire(
              'Error',
              'Lo sentimos el Usuario en el Grupo no ha sido eliminado',
              'error'
            )

          }

        },
        complete: () => {

        },


      }

    )

  };

  obtenerUsuarios(i:number, Id:any): void {
    this.servicioBackend.getRequest('usuarios/'+ Id).subscribe(
      {
        next: (datos) => {
          console.log(datos);
          this.usuario = datos.nombres.toString();
          console.log('el nombre del usuario es:'+ (this.usuario));
          this.listaNombresDeUsuarios.push(this.usuario);
          console.log(this.listaNombresDeUsuarios);
          
        },
        error: (e) => {
          console.log(e);

          if (e.statusCode == 401) {
            this.servicioBackend.authorized = false;

          }


        },
        complete: () => {

        },


      })
  };



}
