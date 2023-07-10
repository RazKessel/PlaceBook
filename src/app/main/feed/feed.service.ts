import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor() { }


  loadGoogleMapsScript(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapKey}&libraries=places}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  initMap(location: string, mapContainer: any, map: any) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: location }, (results: any[], status: string) => {
      if (status === 'OK' && results.length > 0) {
        const locationCoords = results[0].geometry.location;

        map = new google.maps.Map(mapContainer.nativeElement, {
          center: locationCoords,
          zoom: 12
        });

        new google.maps.Marker({
          map: map,
          position: locationCoords
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

}
