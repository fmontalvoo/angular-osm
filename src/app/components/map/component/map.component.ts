import { Component, OnInit, AfterViewInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';

import { Subscription } from 'rxjs';

import { Map, tileLayer, Icon, icon, Marker } from 'leaflet';

import { Place } from '../models/place.model';

import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private map!: Map;
  private icon!: Icon;
  private marker!: Marker;

  @Input() public lat!: number;
  @Input() public lng!: number;
  @Input() public zoom!: number;

  @Output() private placeData!: EventEmitter<Place>;

  private subscription!: Subscription;

  constructor(private mapService: MapService) {
    this.placeData = new EventEmitter();
  }

  ngOnInit(): void {
    this.lat = this.lat ?? 0.0;
    this.lng = this.lng ?? 0.0;
    this.zoom = this.zoom ?? 10;
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private initMap(): void {
    //Inicializa al mapa.
    this.map = new Map('map')
      .setView([this.lat, this.lng], this.zoom);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { //Carga la capa base para el mapa.
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      }
    ).addTo(this.map);

    // Crea un nuevo icono personalizado para el marcador.
    this.icon = icon({
      iconUrl: 'assets/markers/marker.png',
      iconSize: [50, 90],
      iconAnchor: [22, 94],
      popupAnchor: [2, -70]
    });

    this.marker = new Marker([this.lat, this.lng], { icon: this.icon });
    this.marker.addTo(this.map);

    this.map.on('click', this.changeMakerLatLng);
    this.marker.on('move', this.getMarkerLatLng);
  }

  /**
   * Cambia la latitud y longitud del marcador en el mapa.
   * 
   * @param event 
   */
  private changeMakerLatLng = (event: any) => {
    const latlng = event.latlng;
    this.marker.setLatLng(latlng);
    this.marker.addTo(this.map);
    this.emitLatLngData();
  }

  /**
  * Obtiene la latitud y longitud de la posición actual del marcador en el mapa.
  * 
  * @param event 
  */
  private getMarkerLatLng = (event: any) => {
    const latlng = event.latlng;
    this.lat = latlng.lat;
    this.lng = latlng.lng;
  }


  private async emitLatLngData() {
    this.subscription = this.mapService
      .reverseLatLng({ latitude: this.lat, longitude: this.lng })
      .subscribe(response =>
        this.placeData.emit(response)
      );
  }

}
