import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './token.interceptor';
import { HandlingInterceptor } from './handling.interceptor';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandlingInterceptor,
      multi: true
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}