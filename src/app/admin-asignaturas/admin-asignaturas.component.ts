import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BackendService } from '../backend.service';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-admin-asignaturas',
  templateUrl: './admin-asignaturas.component.html',
  styleUrls: ['./admin-asignaturas.component.scss']
})
export class AdminAsignaturasComponent implements OnInit {

  listaAsignaturas: any = [];

  openModalCrear = false;

  formGroupAsignaturas;

  modoFormulario = 'adicion';

  id='';

  constructor(public servicioBackend: BackendService,
    private formBuilder: FormBuilder,
    private servicioSideBar: SidebarService) {


      this.servicioSideBar.rutaActual = 'admin-asignaturas';
      this.obtenerAsignaturas();

      this.formGroupAsignaturas = this.formBuilder.group({

        nombre: ['', Validators.required],
        creditos: [, Validators.required],
        codigoAsignatura: ['', Validators.required],
        areaDeConocimiento: ['', Validators.required],
        programaAcademicoId: ['', Validators.required],
  
      });


     }

  ngOnInit(): void {
  }

  obtenerAsignaturas(): void {
    this.servicioBackend.getRequest('asignaturas').subscribe(
      {
        next: (datos) => {
          this.listaAsignaturas = datos;

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

  crearAsignatura() {

    const asignatura = this.formGroupAsignaturas.getRawValue();
    
    if(!asignatura.nombre){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo nombre',
        'warning'
      );
      return;
    }

    if(!asignatura.creditos){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo Fecha de créditos',
        'warning'
      );
      return;
    }

    if(!asignatura.codigoAsignatura){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo Codigo de Asignatura',
        'warning'
      );
      return;
    }

    if(!asignatura.programaAcademicoId){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo Programa Académico',
        'warning'
      );
      return;
    }

    this.servicioBackend.postRequest('asignaturas', JSON.stringify(asignatura)).subscribe(
      {
        next: (datos) => {
          this.listaAsignaturas.push(asignatura);
          Swal.fire(
            'Que bien!',
            'La Asignatura ha sido agregada',
            'success'
          );
          this.obtenerAsignaturas();
        },
        error: (e) => {
          console.log(e);
          Swal.fire(
            'Error',
            'Lo sentimos la Asignatura no ha sido agregada',
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

  entrarModoEdicion(asignatura: any): void {

    this.formGroupAsignaturas.patchValue(asignatura);
    this.id = asignatura.id;
    this.openModalCrear = true;
    this.modoFormulario = 'edicion';

  };

  cambiarModoAdicion(): void {

    this.modoFormulario = 'adicion';
    this.openModalCrear = false;

  };


  editarAsignatura(): void {

    const asignatura = this.formGroupAsignaturas.getRawValue();

    this.servicioBackend.patchRequest('asignaturas', this.id, JSON.stringify(asignatura)).subscribe(
      {
        next: (datos) => {
          this.listaAsignaturas.push(asignatura);
          Swal.fire(
            'Que bien!',
            'La Asignatura ha sido editada',
            'success'
          );

          this.obtenerAsignaturas();
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
              'Lo sentimos La Asignatura no ha sido editada',
              'error'
            )

          }

        },
        complete: () => {

        },


      }

    )

  };
  
  eliminarAsignatura(id: string): void {

    this.servicioBackend.deleteRequest('asignaturas', id).subscribe(
      {
        next: (datos) => {
          Swal.fire(
            'Que bien!',
            'La asignatura ha sido eliminada',
            'success'
          );

          this.obtenerAsignaturas();
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
              'Lo sentimos la Asignatura no ha sido eliminada',
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
