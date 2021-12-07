import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  rutaRaiz = "http://localhost:3000";
  token: string = '';
  isAutenticate: boolean = false;
  authorized: boolean = true;

  constructor(private http: HttpClient) {

    this.validarAutenticacion();
  }

  validarAutenticacion(): void {

    const token = localStorage.getItem('tokenedu');

    if (token) {
      this.token = token;
      this.isAutenticate = true;
    }

  }

  getRequest(controlador: string): Observable<any> {

    return this.http.get(this.rutaRaiz + '/' + controlador, { headers: new HttpHeaders({ 'Autorization': `Bearer ${this.token}` }) });

  }

  postRequest(controlador: string, data: string): Observable<any> {
    // const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(this.rutaRaiz + '/' + controlador, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Autorization': `Bearer ${this.token}` }) });

  }



  patchRequest(controlador: string, id: string, datos: string): Observable<any> {
    return this.http.patch(
      this.rutaRaiz + '/' + controlador + '/' + id,
      datos,
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Autorization': `Bearer ${this.token}`
          }
        )
      }
    );

  }

  deleteRequest(controlador: string, id: string): Observable<any> {
    return this.http.delete(
      this.rutaRaiz + '/' + controlador + '/' + id,
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Autorization': `Bearer ${this.token}`
          }
        )
      }
    );

  }

  authenticateRequest(credenciales: string) {
    // const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(this.rutaRaiz + '/autenticar', credenciales, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });

  }



}
