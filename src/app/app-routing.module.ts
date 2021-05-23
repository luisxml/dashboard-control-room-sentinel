import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';

// Componentes

import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';

// Services

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: PagesLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        data: { extraParameter: '' }
      }
    ]
  },
  {
    path: 'inicio',
    canActivate: [AuthGuard],
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: InicioComponent,
        data: { extraParameter: '' }
      }
    ]
  },
  {
    path: 'demo-pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/demo-pages/demo-pages.module').then(m => m.DemoPagesModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
