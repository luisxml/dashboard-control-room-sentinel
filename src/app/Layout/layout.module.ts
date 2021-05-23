import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageTitleComponent } from './Components/page-title/page-title.component';

// LAYOUT

import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';

// HEADER

import { HeaderComponent } from './Components/header/header.component';
import { SearchBoxComponent } from './Components/header/elements/search-box/search-box.component';
import { UserBoxComponent } from './Components/header/elements/user-box/user-box.component';

// SIDEBAR

import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { LogoComponent } from './Components/sidebar/elements/logo/logo.component';

// FOOTER

import { FooterComponent } from './Components/footer/footer.component';

// Modules

import { SharedModule } from '../shared/shared.module';

const modules = [
  SharedModule
];

const components = [
  BaseLayoutComponent,
  PagesLayoutComponent,
  PageTitleComponent,
  HeaderComponent,
  SearchBoxComponent,
  UserBoxComponent,
  SidebarComponent,
  LogoComponent,
  FooterComponent,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...components
  ]
})
export class LayoutModule { }
