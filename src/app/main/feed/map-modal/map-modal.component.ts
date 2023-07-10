import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const google: any;

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit {
  @Input() location!: string;
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  map: any;
  showModal: boolean = false;
  constructor() { }
  
  ngOnInit() {

  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  initMap() {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: this.location }, (results: any[], status: string) => {
      if (status === 'OK' && results.length > 0) {
        const locationCoords = results[0].geometry.location;

        this.map = new google.maps.Map(this.mapContainer.nativeElement, {
          center: locationCoords,
          zoom: 12
        });

        new google.maps.Marker({
          map: this.map,
          position: locationCoords
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  openModal() {
    this.showModal = true;
    this.loadGoogleMapsScript().then(() => {
      this.initMap();
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
