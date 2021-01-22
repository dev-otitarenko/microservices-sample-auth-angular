import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HTTPStatus, OAuthHttpInterceptor } from "./_services/oauth.http.interceptor";
import { AppCommonModule } from "./app-common.module";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { LayoutPrivateHeaderComponent } from "./components/layout-private-header/layout-private-header.component";
import { LayoutPublicHeaderComponent } from "./components/layout-public-header/layout-public-header.component";
import { HomeComponent } from "./components/home/home.component";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./_services/auth.guard";
import {LoaderComponent} from "./components/loader/loader.component";

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginComponent,
    LayoutPrivateHeaderComponent,
    LayoutPublicHeaderComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    AppCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    MessageService,
   // Windowref,
    HTTPStatus,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OAuthHttpInterceptor,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
