import { Component } from '@angular/core';
import { Place } from './components/map/models/place.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-osm';

  public place!: Place;

  public getPlaceInfo(place: Place) {
    this.place = place;
  }

}
