import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { numeric, letter, alphanumeric, email, date } from '../../shared/global/validator';

import { UsuarioService } from '../../services/usuario.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public validateForm: FormGroup;
  public vista = 0;

  constructor(
    private usuarioService: UsuarioService,
    private globalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.usuarioService.isAuthenticated()) {
      this.router.navigate(['/inicio']);
    } else {
      this.vista = 1;
    }

    this.createForm();
  }

  private createForm() {
    this.validateForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          email(/^(?!.*[ñÑ])\w+([\.\+\-]?\w+)*@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)
        ]
      ),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ),
      remember: new FormControl(0,
        [
        ]
      )
    });
  }

  revertForm() {
    this.validateForm.reset();
  }

  get email() {
    return this.validateForm.get('email');
  }

  get password() {
    return this.validateForm.get('password');
  }

  get remember() {
    return this.validateForm.get('remember');
  }

  onSubmit() {
    if (
      this.validateForm.invalid
    ) {
      this.validateForm.markAllAsTouched();

      this.globalService.mensajeNotificacion('toastr', 'warning', '¡Formulario incompleto!', 'Debe ingresar todos los datos!');
      return;
    }

    this.usuarioService
      .login({
        email: this.email.value.toLowerCase().trim(),
        password: this.password.value,
        remember: this.remember.value ? 1 : 0
      })
      .subscribe(
        response => {
          this.router.navigate(['/inicio']);
        },
        error => {
        }
      );
  }
}
