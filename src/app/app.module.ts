import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { AuthService } from '@core/auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    HomeComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private authService: AuthService) { }
}
