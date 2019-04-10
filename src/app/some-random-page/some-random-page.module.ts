import { NgModule } from '@angular/core';

import { SomeRandomPageRoutingModule } from './some-random-page.routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ SomeRandomPageRoutingModule.components ],
  imports: [
    SharedModule,
    SomeRandomPageRoutingModule
  ]
})
export class SomeRandomPageModule { }
