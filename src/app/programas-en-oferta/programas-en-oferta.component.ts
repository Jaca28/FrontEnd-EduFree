import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../backend.service';
import { SidebarService } from '../sidebar.service';

interface Programa {
  Nombre: string,
  tipo: string;
  creditos: number
}

@Component({
  selector: 'app-programas-en-oferta',
  templateUrl: './programas-en-oferta.component.html',
  styleUrls: ['./programas-en-oferta.component.scss']
})
export class ProgramasEnOfertaComponent implements OnInit {
 
  listaProgramas: Programa[] = [];

  constructor(
    private servicioBackend: BackendService,
    private servicioSideBar: SidebarService
    ) { 

      this.servicioSideBar.rutaActual = 'programas-en-oferta';
    this.servicioBackend.getRequest('programa-academicos').subscribe(
       {
         next: (datos) => {
          this.listaProgramas = datos;
         },
         error: (e) => {
          console.log(e);
         },
         complete: ()=>{
     
        }    
    }
  );
}

  ngOnInit(): void {
  }

 
  


}