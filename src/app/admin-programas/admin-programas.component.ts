import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BackendService } from '../backend.service';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-admin-programas',
  templateUrl: './admin-programas.component.html',
  styleUrls: ['./admin-programas.component.scss']
})
export class AdminProgramasComponent implements OnInit {

  listaProgramas: any = [];

  openModalCrear = false;

  formGroupPrograma;

  modoFormulario = 'adicion';

  id='';


  constructor(public servicioBackend: BackendService,
    private formBuilder: FormBuilder,
    private servicioSideBar: SidebarService) { 

      this.servicioSideBar.rutaActual = 'admin-programas';
      this.obtenerProgramas();

      this.formGroupPrograma = this.formBuilder.group({

        Nombre: ['', Validators.required],
        fechaCreacion: ['', Validators.required],
        duracion: ['', Validators.required],
        tipo: ['', Validators.required],
        creditos: ['', Validators.required],

  
  
  
      });
    }

  ngOnInit(): void {
  }

  obtenerProgramas(): void {
    this.servicioBackend.getRequest('programa-academicos').subscribe(
      {
        next: (datos) => {
          this.listaProgramas = datos;

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

  crearPrograma() {

    const programa = this.formGroupPrograma.getRawValue();
    
    if(!programa.Nombre){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo nombres',
        'warning'
      );
      return;
    }

    if(!programa.fechaCreacion){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo Fecha de Creación',
        'warning'
      );
      return;
    }

    if(!programa.duracion){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo duracion',
        'warning'
      );
      return;
    }

    if(!programa.tipo){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo tipo',
        'warning'
      );
      return;
    }

    if(!programa.creditos){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo creditos',
        'warning'
      );
      return;
    }

    this.servicioBackend.postRequest('programa-academicos', JSON.stringify(programa)).subscribe(
      {
        next: (datos) => {
          this.listaProgramas.push(programa);
          Swal.fire(
            'Que bien!',
            'El Programa ha sido agregado',
            'success'
          );
          this.obtenerProgramas();
        },
        error: (e) => {
          console.log(e);
          Swal.fire(
            'Error',
            'Lo sentimos el programa no ha sido agregado',
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

  entrarModoEdicion(programa: any): void {

    this.formGroupPrograma.patchValue(programa);
    this.id = programa.id;
    this.openModalCrear = true;
    this.modoFormulario = 'edicion';

  };

  cambiarModoAdicion(): void {

    this.modoFormulario = 'adicion';
    this.openModalCrear = false;

  };

  editarPrograma(): void {

    const programa = this.formGroupPrograma.getRawValue();

    this.servicioBackend.patchRequest('programa-academicos', this.id, JSON.stringify(programa)).subscribe(
      {
        next: (datos) => {
          this.listaProgramas.push(programa);
          Swal.fire(
            'Que bien!',
            'El Programa académico ha sido editado',
            'success'
          );

          this.obtenerProgramas();
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
              'Lo sentimos el Programa Académico no ha sido editado',
              'error'
            )

          }

        },
        complete: () => {

        },


      }

    )

  };


  eliminarPrograma(id: string): void {

    this.servicioBackend.deleteRequest('programa-academicos', id).subscribe(
      {
        next: (datos) => {
          Swal.fire(
            'Que bien!',
            'El Programa acedémico ha sido eliminado',
            'success'
          );

          this.obtenerProgramas();
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
              'Lo sentimos el Programa Académico no ha sido eliminado',
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
