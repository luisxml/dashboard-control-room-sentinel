import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';

import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, Sentinel } from './ThemeOptions/store';
import { ConfigActions } from './ThemeOptions/store/config.actions';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar, faAngleDown, faAngleUp, faTh, faCheck, faTrash, faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
// import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// Componentes

import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';

// Interceptors

import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';

// Services

import { DeviceDetectorService } from 'ngx-device-detector';

import { GlobalService } from './services/global.service';
import { UsuarioService } from './services/usuario.service';
import { LoaderService } from './services/loader.service';
import { AuthGuard } from './services/auth.guard';

// Modules

import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './Layout/layout.module';

// Pipes

import { SafePipe } from './pipes/safe.pipe';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const components = [
  LoginComponent,
  InicioComponent
];

const modules = [
  SharedModule,
  LayoutModule
];

const services = [
  GlobalService,
  UsuarioService,
  DeviceDetectorService,
  LoaderService,
  AuthGuard
];

@NgModule({
  declarations: [
    AppComponent,
    ...components,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...modules
  ],
  providers: [
    ...services,
    {
      provide:
        PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    ConfigActions,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    private ngRedux: NgRedux<Sentinel>,
    private devTool: DevToolsExtension,
    private library: FaIconLibrary
  ) {
    library.addIcons(faStar, faAngleDown, faAngleUp, faTh, faCheck, faTrash, faEllipsisV, faPlus);

    this.ngRedux.configureStore(
      rootReducer,
      {} as Sentinel,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
