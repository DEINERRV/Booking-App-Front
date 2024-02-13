import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject} from '@angular/core';
import { AmenitiesComponent } from '../amenities/amenities.component';
import { MapService } from '../../../../services/map.service';
import { Map, Marker } from 'leaflet';
import { CalendarComponent } from '../calendar/calendar.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroSparkles, heroClock } from '@ng-icons/heroicons/outline';
import { ionBedOutline } from '@ng-icons/ionicons';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-lodging-info',
  standalone: true,
  imports: [AmenitiesComponent, CalendarComponent,NgIconComponent],
  providers: [provideIcons({ heroSparkles, heroClock, ionBedOutline})],
  templateUrl: './lodging-info.component.html',
  styleUrl: './lodging-info.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LodgingInfoComponent implements OnInit{

  private _mapService: MapService = inject(MapService);
  private map!: Map
  private leaflet!: any
  private markers: Marker[] = []

  ngOnInit(): void {
    this._mapService.getLeaflet().then((lib)=>{
      this.leaflet = lib;
      this.initializeMap();
      this.addMarkers();
      this.centerMap();
    }).catch(err => {})
    
  }

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = this.leaflet.map('map',{
      minZoom: 2.3,
      maxBounds: this.leaflet.latLngBounds([-90, -180],[90, 180]),
      maxBoundsViscosity: 1
    });
    this.leaflet.tileLayer(baseMapURl).addTo(this.map);
  }


  private addMarkers() {
    // Add your markers to the map
    this.markers.push(this.leaflet.marker([51.5, -0.09]))
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  private centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations
    const bounds = this.leaflet.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    // Fit the map view to the bounds
    this.map.fitBounds(bounds);
  }
}
