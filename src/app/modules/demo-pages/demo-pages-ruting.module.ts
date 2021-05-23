import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseLayoutComponent } from '../../Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from '../../Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Dashboards

import { AnalyticsComponent } from './components/Dashboards/analytics/analytics.component';

// Pages

import { ForgotPasswordBoxedComponent } from './components/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import { LoginBoxedComponent } from './components/UserPages/login-boxed/login-boxed.component';
import { RegisterBoxedComponent } from './components/UserPages/register-boxed/register-boxed.component';

// Elements

import { StandardComponent } from './components/Elements/Buttons/standard/standard.component';
import { DropdownsComponent } from './components/Elements/dropdowns/dropdowns.component';
import { CardsComponent } from './components/Elements/cards/cards.component';
import { ListGroupsComponent } from './components/Elements/list-groups/list-groups.component';
import { TimelineComponent } from './components/Elements/timeline/timeline.component';
import { IconsComponent } from './components/Elements/icons/icons.component';

// Components

import { AccordionsComponent } from './components/Components/accordions/accordions.component';
import { TabsComponent } from './components/Components/tabs/tabs.component';
import { CarouselComponent } from './components/Components/carousel/carousel.component';
import { ModalsComponent } from './components/Components/modals/modals.component';
import { ProgressBarComponent } from './components/Components/progress-bar/progress-bar.component';
import { PaginationComponent } from './components/Components/pagination/pagination.component';
import { TooltipsPopoversComponent } from './components/Components/tooltips-popovers/tooltips-popovers.component';

// Tables

import { TablesMainComponent } from './components/Tables/tables-main/tables-main.component';

// Widgets

import { ChartBoxes3Component } from './components/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import { ControlsComponent } from './components/Forms/Elements/controls/controls.component';
import { LayoutComponent } from './components/Forms/Elements/layout/layout.component';

// Charts

import { ChartjsComponent } from './components/Charts/chartjs/chartjs.component';

const routes: Routes = [
    {
        path: '',
        /* canActivate: [AuthGuard], */
        component: BaseLayoutComponent,
        children: [
            // Dashboads

            { path: '', component: AnalyticsComponent, data: { extraParameter: 'dashboardsMenu' } },

            // Elements

            { path: 'elements/buttons-standard', component: StandardComponent, data: { extraParameter: 'elementsMenu' } },
            { path: 'elements/dropdowns', component: DropdownsComponent, data: { extraParameter: 'elementsMenu' } },
            { path: 'elements/icons', component: IconsComponent, data: { extraParameter: 'elementsMenu' } },
            { path: 'elements/cards', component: CardsComponent, data: { extraParameter: 'elementsMenu' } },
            { path: 'elements/list-group', component: ListGroupsComponent, data: { extraParameter: 'elementsMenu' } },
            { path: 'elements/timeline', component: TimelineComponent, data: { extraParameter: 'elementsMenu' } },

            // Components

            { path: 'components/tabs', component: TabsComponent, data: { extraParameter: 'componentsMenu' } },
            { path: 'components/accordions', component: AccordionsComponent, data: { extraParameter: 'componentsMenu' } },
            { path: 'components/modals', component: ModalsComponent, data: { extraParameter: 'componentsMenu' } },
            { path: 'components/progress-bar', component: ProgressBarComponent, data: { extraParameter: 'componentsMenu' } },
            { path: 'components/tooltips-popovers', component: TooltipsPopoversComponent, data: { extraParameter: 'componentsMenu' } },
            { path: 'components/carousel', component: CarouselComponent, data: { extraParameter: 'componentsMenu' } },
            { path: 'components/pagination', component: PaginationComponent, data: { extraParameter: 'componentsMenu' } },

            // Tables

            { path: 'tables/bootstrap', component: TablesMainComponent, data: { extraParameter: 'tablesMenu' } },

            // Widgets

            { path: 'widgets/chart-boxes-3', component: ChartBoxes3Component, data: { extraParameter: 'pagesMenu3' } },

            // Forms Elements

            { path: 'forms/controls', component: ControlsComponent, data: { extraParameter: 'formElementsMenu' } },
            { path: 'forms/layouts', component: LayoutComponent, data: { extraParameter: 'formElementsMenu' } },

            // Charts

            { path: 'charts/chartjs', component: ChartjsComponent, data: { extraParameter: '' } },

        ]

    },
    {
        path: '',
        component: PagesLayoutComponent,
        children: [
            // User Pages

            { path: 'pages/login-boxed', component: LoginBoxedComponent, data: { extraParameter: '' } },
            { path: 'pages/register-boxed', component: RegisterBoxedComponent, data: { extraParameter: '' } },
            { path: 'pages/forgot-password-boxed', component: ForgotPasswordBoxedComponent, data: { extraParameter: '' } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoPagesRoutingModule { }
