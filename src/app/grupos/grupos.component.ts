import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BackendService } from '../backend.service';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  listaGrupos: any = [];
  listaUsuariosPorGrupo: any = [];
  lista: any = [];

  openModalCrear = false;
  openModalGrupo = false;

  formGroupGrupo;
  modoFormulario = 'adicion';
  id = '';

  constructor(public servicioBackend: BackendService,
    private formBuilder: FormBuilder,
    private servicioSideBar: SidebarService) {

      this.servicioSideBar.rutaActual = 'grupos';
      this.obtenerGrupos();

    this.formGroupGrupo = this.formBuilder.group({

      nombre: ['', Validators.required],
      horario: ['', Validators.required],
      asignaturaId: ['', Validators.required],
      
    });

     }

  ngOnInit(): void {
  };

  obtenerGrupos(): void {
    this.servicioBackend.getRequest('grupos').subscribe(
      {
        next: (datos) => {
          this.listaGrupos = datos;

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

  crearGrupo() {

    const grupo = this.formGroupGrupo.getRawValue();
    
    if(!grupo.nombre){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo nombre',
        'warning'
      );
      return;
    }

    if(!grupo.horario){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo horario',
        'warning'
      );
      return;
    }

    if(!grupo.asignaturaId){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo Asignatura Id',
        'warning'
      );
      return;
    }



    this.servicioBackend.postRequest('grupos', JSON.stringify(grupo)).subscribe(
      {
        next: (datos) => {
          this.listaGrupos.push(grupo);
          Swal.fire(
            'Que bien!',
            'El Grupo ha sido agregado',
            'success'
          );
          this.obtenerGrupos();
        },
        error: (e) => {
          console.log(e);
          Swal.fire(
            'Error',
            'Lo sentimos el grupo no ha sido agregado',
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

  verGrupo(grupo: any): void{
    this.openModalGrupo = !this.openModalGrupo;
    console.log('El id del grupo es:'+ grupo.id)
    const strGrupoId = grupo.id;
    console.log('El idd del grupo es:'+ strGrupoId)
    this.obtenerUsuariosporGrupo(strGrupoId);
  }

  entrarModoEdicion(grupo: any): void {

    this.formGroupGrupo.patchValue(grupo);
    this.id = grupo.id;
    this.openModalCrear = true;
    this.modoFormulario = 'edicion';

  };

  cambiarModoAdicion(): void {

    this.modoFormulario = 'adicion';
    this.openModalCrear = false;

  };

  editarGrupo(): void {

    const grupo = this.formGroupGrupo.getRawValue();
    

    this.servicioBackend.patchRequest('grupos', this.id, JSON.stringify(grupo)).subscribe(
      {
        next: (datos) => {
          this.listaGrupos.push(grupo);
          Swal.fire(
            'Que bien!',
            'El Grupo ha sido editado',
            'success'
          );

          this.obtenerGrupos();
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
              'Lo sentimos el Grupo no ha sido editado',
              'error'
            )

          }

        },
        complete: () => {

        },


      }

    )

  };

  eliminarGrupo(id: string): void {

    this.servicioBackend.deleteRequest('grupos', id).subscribe(
      {
        next: (datos) => {
          Swal.fire(
            'Que bien!',
            'El Grupo ha sido eliminado',
            'success'
          );

          this.obtenerGrupos();
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
              'Lo sentimos el Grupo no ha sido eliminado',
              'error'
            )

          }

        },
        complete: () => {

        },


      }

    )

  };

  obtenerUsuariosporGrupo(grupoId: string): void {

    console.log('el ID del grupo es:'+ grupoId);
    this.servicioBackend.getRequest('usuario-por-grupos').subscribe(
      {
        next: (datos) => {

          console.log(datos);
          
          this.listaUsuariosPorGrupo = datos;
          console.log(this.listaUsuariosPorGrupo);
          
          for(let i = 0; i <= this.listaUsuariosPorGrupo.length; i++){
            
            
            if(this.listaUsuariosPorGrupo[i].grupoId = grupoId){
              const usuarioSeleccionado = this.listaUsuariosPorGrupo[i];
              this.lista = usuarioSeleccionado;
              
            };
          };

          console.log('La lista es:'+this.lista);

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
