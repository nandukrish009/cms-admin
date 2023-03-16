import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DataTableComponent } from './data-table/data-table.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  { path: 'login', component: AdminLoginComponent, pathMatch: 'full' },
  {
    path: 'data-table',
    component: DataTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
  // { path: 'flowpage', component: FlowMainContainerComponent },
  // { path: 'contentMang', component: ContentManagmentComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
