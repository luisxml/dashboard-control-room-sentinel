import { NgModule } from '@angular/core';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';

const librerias = [
    LoadingBarRouterModule,
    PerfectScrollbarModule,
    NgbModule,
    FontAwesomeModule,
    ChartsModule,
];

@NgModule({
    imports: [
        ...librerias
    ],
    exports: [
        ...librerias
    ],
})
export class Librerias { }
