import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { SecurityHttpInterceptor } from './authentication/security-http-interceptor';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    AuthenticationModule,
    ChartsModule,
    HammerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
