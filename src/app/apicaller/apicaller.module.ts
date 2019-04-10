import { NgModule } from '@angular/core';
import { ApicallerRoutingModule } from './apicaller.routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ ApicallerRoutingModule.components ],
  imports: [
    SharedModule,
    ApicallerRoutingModule
  ]
})
export class ApicallerModule { }
