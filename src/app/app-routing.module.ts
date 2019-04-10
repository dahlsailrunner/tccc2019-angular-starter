import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { HomeComponent } from './home/home.component';

const routes: Routes =  [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent,
  },
  {
    path: 'some-random-page',
    loadChildren: './some-random-page/some-random-page.module#SomeRandomPageModule'
  },
  {
    path: 'logout',
    loadChildren: './logout/logout.module#LogoutModule'
  },
  {
    path: 'api-caller',
    loadChildren: './apicaller/apicaller.module#ApicallerModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
