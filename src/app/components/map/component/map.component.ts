import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { Map, tileLayer } from 'leaflet';

import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map!: Map;

  @Input() public lat!: number;
  @Input() public lng!: number;
  @Input() public zoom!: number;

  constructor(private mapService: MapService) {
    this.lat = this.lat ?? 0.0;
    this.lng = this.lng ?? 0.0;
    this.zoom = this.zoom ?? 10;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    //Inicializa al mapa.
    this.map = new Map('map').setView([this.lat, this.lng], this.zoom);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //Carga la capa base para el mapa.
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }
}
