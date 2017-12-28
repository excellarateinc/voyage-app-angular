import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http, XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SecureHttpClient } from './authentication/secure-http-client';
import { AuthGuardService } from './authentication/auth-guard.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AngularMaterialModule } from "./angular-material/angular-material.module";

export function secureHttpClientFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  authenticationService: AuthenticationService): Http {
    return new SecureHttpClient(xhrBackend, requestOptions, authenticationService);
  }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    AuthenticationModule
  ],
  providers: [
    { provide: Http, useFactory: secureHttpClientFactory, deps: [XHRBackend, RequestOptions, AuthenticationService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
