import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { BackendService } from '../backend.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-registro-de-usuario',
  templateUrl: './registro-de-usuario.component.html',
  styleUrls: ['./registro-de-usuario.component.scss']
})
export class RegistroDeUsuarioComponent implements OnInit {

  formRegister: any;

  titulo: string = 'Registro de Estudiante';

  constructor(private formBuilder: FormBuilder, 
    private servicioBackend: BackendService, 
    private router: Router,
    private servicioSideBar: SidebarService) {

    this.servicioSideBar.rutaActual = 'registro-de-usuario';
    this.formRegister = this.formBuilder.group({

      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
      perfilId: ['']

    });
   };

  ngOnInit(): void {
  };

  register():void {

    const contraseniaEncriptada = Md5.hashStr(this.formRegister.controls.contrasenia.value);
    const credenciales = this.formRegister.getRawValue();
    credenciales.contrasenia = contraseniaEncriptada;
    credenciales.perfilId = "Estudiante";

    if(!credenciales.nombres){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo nombres',
        'warning'
      );
      return;
    }

    if(!credenciales.apellidos){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo apellidos',
        'warning'
      );
      return;
    }

    if(!credenciales.correo){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo correo',
        'warning'
      );
      return;
    }

    if(!credenciales.contrasenia){
      Swal.fire(
        'Falta un campo!',
        'Rellena el campo contraseña',
        'warning'
      );
      return;
    }

    this.servicioBackend.postRequest('usuarios', JSON.stringify(credenciales)).subscribe(
      {
        next: (datos: any)=> {
          this.formRegister.reset();
          Swal.fire(
            'Te has Registrado!',
            'Inicia Sesión con tus credenciales',
            'success'
          );
          
          this.router.navigate(['/login']);

        },
        error: (e)=> {
          console.log(e);
          
          Swal.fire(
            'Error',
            'Lo sentimos  el registro falló',
            'error'
          )
          

        },
        complete: ()=> {
    
        },

    } );

  };

}
