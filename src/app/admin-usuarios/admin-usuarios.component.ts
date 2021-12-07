import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BackendService } from '../backend.service';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {


  tiposDeUsuarios = [
    {
      codigo: '6196fbbdd6f2afc2a855e7c5',
      texto: 'Estudiante'
    },
    {
      codigo: '6196fbcfd6f2afc2a855e7c6',
      texto: 'Docente'
    },
    {
      codigo: '6196fbf1d6f2afc2a855e7c7',
      texto: 'Administrador'
    }
  ];

  listaUsuarios: any = [];

  openModalCrear = false;

  formGroupUsuario;
  modoFormulario = 'adicion';
  id = '';

  //  perfil;


  constructor(
    public servicioBackend: BackendService,
    private formBuilder: FormBuilder,
    private servicioSideBar: SidebarService
  ) {

    this.servicioSideBar.rutaActual = 'admin-usuarios';
    this.obtenerUsuarios();

    this.formGroupUsuario = this.formBuilder.group({

      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
      codigo: [''],
      perfilId: ['', Validators.required],



    });



  }

  ngOnInit(): void {
  }
  obtenerUsuarios(): void {
    this.servicioBackend.getRequest('usuarios').subscribe(
      {
        next: (datos) => {
          this.listaUsuarios = datos;

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

  crearUsuario() {

    const usuario = this.formGroupUsuario.getRawValue();
    
    if(!usuario.nombres){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo nombres',
        'warning'
      );
      return;
    }

    if(!usuario.apellidos){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo apellidos',
        'warning'
      );
      return;
    }

    if(!usuario.correo){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo correo',
        'warning'
      );
      return;
    }

    if(!usuario.perfilId){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo perfil',
        'warning'
      );
      return;
    }


    this.servicioBackend.postRequest('usuarios', JSON.stringify(usuario)).subscribe(
      {
        next: (datos) => {
          this.listaUsuarios.push(usuario);
          this.formGroupUsuario.reset();
          Swal.fire(
            'Que bien!',
            'El Usuario ha sido agregado',
            'success'
          );
          this.obtenerUsuarios();
        },
        error: (e) => {
          console.log(e);
          Swal.fire(
            'Error',
            'Lo sentimos el usuario no ha sido agregado',
            'error'
          )
        },
        complete: () => {

        },


      }

    )
  }

  abrirFormulario(): void {
    this.openModalCrear = !this.openModalCrear;
  };

  entrarModoEdicion(usuario: any): void {

    this.formGroupUsuario.patchValue(usuario);
    this.id = usuario.id;
    this.openModalCrear = true;
    this.modoFormulario = 'edicion';

  }

  cambiarModoAdicion(): void {

    this.modoFormulario = 'adicion';
    this.formGroupUsuario.reset();
    this.openModalCrear = false;

  }

  editarUsuario(): void {

    const usuario = this.formGroupUsuario.getRawValue();
    // usuario['perfilId'] = '6196fbbdd6f2afc2a855e7c5'

    this.servicioBackend.patchRequest('usuarios', this.id, JSON.stringify(usuario)).subscribe(
      {
        next: (datos) => {
          this.formGroupUsuario.reset();
          this.listaUsuarios.push(usuario);
          Swal.fire(
            'Que bien!',
            'El Usuario ha sido editado',
            'success'
          );

          this.obtenerUsuarios();
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
              'Lo sentimos el usuario no ha sido editado',
              'error'
            )

          }

        },
        complete: () => {

        },


      }

    )

  }

  eliminarUsuario(id: string): void {

    this.servicioBackend.deleteRequest('usuarios', id).subscribe(
      {
        next: (datos) => {
          this.formGroupUsuario.reset();
          Swal.fire(
            'Que bien!',
            'El Usuario ha sido eliminado',
            'success'
          );

          this.obtenerUsuarios();
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
              'Lo sentimos el usuario no ha sido eliminado',
              'error'
            )

          }

        },
        complete: () => {

        },


      }

    )

  };


}
