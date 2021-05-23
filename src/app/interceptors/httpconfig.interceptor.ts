import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
/* import { throwError } from 'rxjs/internal/observable/throwError'; */
import { throwError } from 'rxjs';
import { Location } from '@angular/common';
import { map, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
/* import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; */

import { GlobalService } from '../services/global.service';
import { UsuarioService } from '../services/usuario.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private location: Location,
        private router: Router,
        private globalService: GlobalService,
        private usuarioService: UsuarioService,
        private activatedRoute: ActivatedRoute
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                switch (true) {
                    case error.status === 400:
                        this.globalService.mensajeNotificacion('toastr', 'error', 'Error!', 'La solicitud fue es incorrecta!');
                        break;

                    case error.status === 401:
                        if (error.hasOwnProperty('error') && error.error.hasOwnProperty('message')) {
                            if (this.usuarioService.getToken() && error.error.message === 'Usuario no autenticado') {
                                localStorage.removeItem('token');
                                /* location.reload(); */

                                const url = this.router.url;
                                if (url.indexOf('extender') >= 0) {
                                    localStorage.setItem('next', url);
                                }

                                this.router.navigate(['/']);
                            } else {
                                if (
                                    this.location.isCurrentPathEqualTo('/login') ||
                                    this.location.isCurrentPathEqualTo('/usil') ||
                                    this.location.isCurrentPathEqualTo('/completar-perfil') ||
                                    this.location.isCurrentPathEqualTo('/partner/:bag')
                                ) {
                                    this.globalService.mensajeNotificacion('toastr', 'error', 'Error!', error.error.message);
                                } else {
                                    this.globalService.mensajeNotificacion('toastr', 'error', 'Error!', error.error.message);
                                }
                            }
                        } else {
                        }
                        break;

                    case error.status === 403:
                        if (
                            this.location.isCurrentPathEqualTo('/crear-cuenta')
                        ) {
                            let objError;

                            switch (true) {
                                case error.hasOwnProperty('error') && error.error.hasOwnProperty('errors'):
                                    objError = error.error.errors;
                                    break;
                            }

                            for (const clave in objError) {
                                if (objError.hasOwnProperty(clave)) {
                                    // tslint:disable-next-line:max-line-length
                                    this.globalService.mensajeNotificacion('toastr', 'error', 'Error!', clave + ': ' + objError[clave].join(', '));
                                }
                            }
                        } else {
                            this.globalService.mensajeNotificacion('toastr', 'error', 'Error!', error.error.message);
                        }
                        break;

                    case error.status === 404:
                        this.globalService.mensajeNotificacion('toastr', 'error', 'Error!', error.error.message);
                        break;

                    case error.status === 405:
                        this.globalService
                            .mensajeNotificacion('toastr', 'error', 'Error!', 'Método que intenta acceder no esta permitido!');
                        break;

                    case error.status === 422:
                        let objError;

                        switch (true) {
                            case error.hasOwnProperty('error') && error.error.hasOwnProperty('errors'):
                                objError = error.error.errors;
                                break;
                        }

                        for (const clave in objError) {
                            if (objError.hasOwnProperty(clave)) {
                                // tslint:disable-next-line:max-line-length
                                this.globalService.mensajeNotificacion('toastr', 'error', 'Error!', clave + ': ' + objError[clave].join(', '));
                            }
                        }
                        break;

                    case error.status === 429:
                        this.globalService.mensajeNotificacion('toastr', 'error', 'Error!', error.error.message);
                        break;

                    case error.status === 500:
                        this.globalService.mensajeNotificacion('toastr', 'error', 'Error!', 'Problemas con el servidor!');
                        break;
                }

                // return Observable.throwError(error);
                return throwError(error);
            }));
    }
}
