import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IsometricGridModule } from 'libs/isometric-grid/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IsometricGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
