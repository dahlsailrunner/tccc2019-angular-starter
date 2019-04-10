import { NgModule } from '@angular/core';
import { LogoutRoutingModule } from './logout.routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LogoutRoutingModule.components],
  imports: [
    SharedModule,
    LogoutRoutingModule
  ]
})
export class LogoutModule { }
