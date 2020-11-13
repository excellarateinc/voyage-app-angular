import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ChartsModule } from 'ng2-charts';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { SecurityHttpInterceptor } from './authentication/security-http-interceptor';

function oauthInitializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        try {
          await keycloak.init({
              config: {
                  url: environment.OAUTH_SERVER_URL,
                  realm: environment.OUATH_REALM,
                  clientId: environment.OAUTH_CLIENT_ID,
                  credentials: { secret: environment.OAUTH_CLIENT_SECRET }
              },
            loadUserProfileAtStartUp: false,
            initOptions: {
              onLoad: 'login-required',
              checkLoginIframe: false,
              redirectUri: environment.OAUTH_REDIRECT_URL
            },
            bearerExcludedUrls: ['/assets']
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    };
}

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
    ChartsModule,
    HammerModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: oauthInitializer,
      deps: [KeycloakService],
      multi: true
  },
   {
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityHttpInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
