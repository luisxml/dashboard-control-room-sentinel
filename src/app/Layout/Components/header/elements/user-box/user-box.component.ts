import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../../../theme-options';

import { UsuarioService } from '../../../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  public usuario;
  public image;

  constructor(
    public globals: ThemeOptions,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();

    if (
      this.usuario !== null &&
      this.usuario.hasOwnProperty('imageContentType') &&
      this.usuario.imageContentType.length &&
      this.usuario.hasOwnProperty('image') &&
      this.usuario.image.length
    ) {
      this.image = 'data:' + this.usuario.imageContentType + ';base64,' + this.usuario.image;
    } else {
      this.image = './assets/images/avatars/1.jpg';
    }
  }

  logOut() {
    setTimeout(() => {
      this.usuarioService.logOut()
        .subscribe(
          response => {
            this.router.navigate(['/login']);
          },
          error => {
          }
        );
    }, 500);
  }
}
