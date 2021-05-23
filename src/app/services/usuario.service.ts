import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { GlobalService } from './global.service';
import { ErrorhandlerService } from './errorhandler.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public urlApi: string;
  public token;
  public usuario;

  constructor(
    private globalService: GlobalService,
    private httpClient: HttpClient,
    private errorhandlerService: ErrorhandlerService,
    private router: Router
  ) {
    this.urlApi = this.globalService.getUrl();
  }

  login(userLogin): Observable<any> {
    const params = JSON.stringify(userLogin);

    const headers = new HttpHeaders(
      {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    );

    return this.httpClient
      .post(this.urlApi + '/login', params, { headers })
      .pipe(
        retry(1),
        map((data: any) => {
          this.setToken(data.token);
          this.setUsuario(data.usuario);
        }),
        catchError(this.errorhandlerService.handleError)
      );
  }

  logOut() {
    const params = JSON.stringify({ token: this.getToken() });

    const headers = new HttpHeaders(
      {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    );

    return this.httpClient
      .post(this.urlApi + '/logout', params, { headers })
      .pipe(
        retry(1),
        map((data: any) => {
          this.setToken(null);
          this.setUsuario(null);
        }),
        catchError(this.errorhandlerService.handleError)
      );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token !== null) {
      return true;
    }
    return false;
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token = localStorage.getItem('token');

    if (token !== undefined && token !== 'null') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  setUsuario(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario() {
    const usuario = localStorage.getItem('usuario');

    if (usuario !== undefined && usuario !== 'null') {
      this.usuario = JSON.parse(usuario);
    } else {
      this.usuario = null;
    }

    return this.usuario;
  }
}
