import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SomeRandomPageComponent } from './some-random-page.component';

const routes: Routes = [
  { path: '', component: SomeRandomPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SomeRandomPageRoutingModule {
  static components = [ SomeRandomPageComponent ];
 }
