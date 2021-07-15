import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { MapService } from './services/map.service';

import { MapComponent } from './component/map.component';

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MapComponent,
  ],
  providers: [MapService]
})
export class MapModule { }
