import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { Librerias } from './global/librerias';
import { TemplateValidatorComponent } from './components/template-validator/template-validator.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    TemplateValidatorComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    Librerias
  ],
  exports: [
    Librerias,
    TemplateValidatorComponent,
    LoadingComponent
  ],
  entryComponents: [

  ],
})
export class SharedModule { }
