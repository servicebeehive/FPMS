import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigInit } from './common/services/config/config.init';
import { ConfigService } from './common/services/config/config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Controllers } from './common/models/controllers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MasterDataService } from './common/services/master-data/master-data.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BaseInterceptor } from './common/interceptor/base.interceptor';

import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigInit.loadConfig,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (MS: MasterDataService) => () => MS.getMasterData(),
      deps: [MasterDataService],
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseInterceptor,
      multi: true
    },
    Controllers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
