import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {
  }
  canActivate() {
    if (!this.usuarioService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
    /* let validation = this.auth.validateAccess(route.routeConfig.path);
    if (!validation) {
      this.router.navigate(['']);
      swal.fire({
        title: 'No tienes acceso a esta funcionalidad.',
        timer: 3000,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        icon: 'error'
      })
    }
    return this.auth.validateAccess(route.routeConfig.path); */
  }
}
