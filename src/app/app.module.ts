import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { MapModule } from './components/map/map.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MapModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
