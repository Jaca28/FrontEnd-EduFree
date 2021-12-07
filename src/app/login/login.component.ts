import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { BackendService } from '../backend.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { SidebarService } from '../sidebar.service';

interface Usuario {
  nombre: string,
  apellidos: string
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  formLogin: any;

  titulo: string = 'Iniciar Sesión';

  

  constructor(private formBuilder: FormBuilder, 
    private servicioBackend: BackendService, 
    private router: Router,
    private servicioSideBar: SidebarService ) { 
    

    this.servicioSideBar.rutaActual = 'login';
    this.formLogin = this.formBuilder.group({

      correo: ['', Validators.required],
      contrasenia: ['', Validators.required]

    });
  }

  ngOnInit(): void {
  }

  login():void {

    const contraseniaEncriptada = Md5.hashStr(this.formLogin.controls.contrasenia.value);
    const credenciales = this.formLogin.getRawValue();
    credenciales.contrasenia = contraseniaEncriptada;

    if(!credenciales){
      Swal.fire(
        'Ups!',
        'Necesitamos tus credenciales',
        'warning'
      );
      return;
    }

    this.servicioBackend.authenticateRequest(JSON.stringify(credenciales)).subscribe(
      {
        next: (datos: any)=> {
          console.log(datos);
          const token = datos['tk']
          localStorage.setItem('tokenedu', token)
          this.servicioBackend.isAutenticate = true;
          this.servicioBackend.token = token;
          
          this.router.navigate(['/admin-usuarios']);

          Swal.fire(
            'Bienvenido',
            'Has sido Autenticado',
            'success'
          )
        },
        error: (e)=> {
          console.log(e);
          
          Swal.fire(
            'Error',
            'Lo sentimos sus datos son erroneos',
            'error'
          )
          

        },
        complete: ()=> {
    
        },

    } );

  };

};
