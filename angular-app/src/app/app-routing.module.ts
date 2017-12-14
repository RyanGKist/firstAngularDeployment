import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Component } from '@angular/core/src/metadata/directives';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './list/edit/edit.component';

const routes: Routes = [
  {
    path: ' ',
    pathMatch: 'full',
    component: AppComponent,
  },
  {
    path:'edit/:id',
    pathMatch: 'full',
    component: EditComponent,
  },
  {
    path:'view/:id',
    pathMatch: 'full',
    component : DisplayComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
