import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DemoPagesRoutingModule } from './demo-pages-ruting.module';

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

import { RegularComponent } from './components/Tables/regular/regular.component';
import { TablesMainComponent } from './components/Tables/tables-main/tables-main.component';

// Widgets

import { ChartBoxes3Component } from './components/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import { ControlsComponent } from './components/Forms/Elements/controls/controls.component';
import { LayoutComponent } from './components/Forms/Elements/layout/layout.component';

// Charts

import { ChartjsComponent } from './components/Charts/chartjs/chartjs.component';

// Chart.js Examples

import { LineChartComponent } from './components/Charts/chartjs/examples/line-chart/line-chart.component';
import { BarChartComponent } from './components/Charts/chartjs/examples/bar-chart/bar-chart.component';
import { ScatterChartComponent } from './components/Charts/chartjs/examples/scatter-chart/scatter-chart.component';
import { RadarChartComponent } from './components/Charts/chartjs/examples/radar-chart/radar-chart.component';
import { PolarAreaChartComponent } from './components/Charts/chartjs/examples/polar-area-chart/polar-area-chart.component';
import { BubbleChartComponent } from './components/Charts/chartjs/examples/bubble-chart/bubble-chart.component';
import { DynamicChartComponent } from './components/Charts/chartjs/examples/dynamic-chart/dynamic-chart.component';
import { DoughnutChartComponent } from './components/Charts/chartjs/examples/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './components/Charts/chartjs/examples/pie-chart/pie-chart.component';

// Modules

import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../Layout/layout.module';

const modules = [
  SharedModule,
  LayoutModule
];

const components = [
  AnalyticsComponent,
  ForgotPasswordBoxedComponent,
  LoginBoxedComponent,
  RegisterBoxedComponent,
  StandardComponent,
  IconsComponent,
  DropdownsComponent,
  CardsComponent,
  ListGroupsComponent,
  TimelineComponent,
  AccordionsComponent,
  TabsComponent,
  CarouselComponent,
  ModalsComponent,
  ProgressBarComponent,
  PaginationComponent,
  TooltipsPopoversComponent,
  RegularComponent,
  TablesMainComponent,
  ChartBoxes3Component,
  ControlsComponent,
  LayoutComponent,
  ChartjsComponent,
  LineChartComponent,
  BarChartComponent,
  DoughnutChartComponent,
  RadarChartComponent,
  PieChartComponent,
  PolarAreaChartComponent,
  DynamicChartComponent,
  BubbleChartComponent,
  ScatterChartComponent,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    DemoPagesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...modules
  ],
  exports: [
  ]
})
export class DemoPagesModule { }
