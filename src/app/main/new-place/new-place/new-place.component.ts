import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { PlacesService } from 'src/app/_services/places.service';
import { AuthService } from 'src/app/_services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var google: any;
@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.scss']
})
export class NewPlaceComponent {
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  locationResults: string[] = [];
  selectedLocation: string = '';
  showLocationList: boolean = false;

  newPlaceForm!: FormGroup

  constructor(private http: HttpClient, private ngZone: NgZone, private placesService: PlacesService, private router: Router) {

    this.newPlaceForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
    })

  }

  ngOnInit() {
    this.loadGoogleMapsScript();
  }

  loadGoogleMapsScript() {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapKey}&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.body.appendChild(googleMapsScript);
    googleMapsScript.onload = () => {
      this.initializeGoogleMaps();
    };
  }

  initializeGoogleMaps() {
    const autocompleteService = new google.maps.places.AutocompleteService();
    // Use the autocompleteService for fetching location suggestions or other tasks
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.generatePreviewUrl();
  }

  onUpload() {
    // Add code for uploading the image to the server
  }

  generatePreviewUrl() {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }

  onLocationInput(query: any) {
    const inputValue = query.target.value as string;
    if (inputValue.trim() !== '') {
      // Call the Google Maps Places API to fetch location suggestions based on the query
      this.fetchLocationSuggestions(inputValue).then((results: string[]) => {
        this.ngZone.run(() => {
          this.locationResults = results;
          this.showLocationList = true;
        });
      });
    } else {
      this.locationResults = [];
      this.showLocationList = false;
    }
  }

  fetchLocationSuggestions(query: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const service = new google.maps.places.AutocompleteService();
      const request = {
        input: query
      };
      service.getPlacePredictions(request, (predictions: any[], status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const results: string[] = predictions.map(prediction => prediction.description);
          resolve(results);
        } else {
          console.error('Error fetching location suggestions:', status);
          reject([]);
        }
      });
    });
  }


  onLocationSelected(location: string) {
    this.selectedLocation = location;
    this.showLocationList = false;
  }

  onChangeImage() {
    this.selectedFile = null;
    this.previewUrl = null;
    const fileInput: any = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = ''; // Clear the selected file from the input
    }
  }

  onSubmit() {

    // Check if the form is valid
    if(!this.newPlaceForm.valid) {
      alert('Please fill all the fields');
      return;
    }

    const file = this.selectedFile;
    if (file) {
      const formData = new FormData();

      formData.append('title', this.newPlaceForm.controls['title'].value);
      formData.append('description', this.newPlaceForm.controls['description'].value);
      formData.append('location', this.newPlaceForm.controls['location'].value);
      formData.append('photo', file, file.name);

      this.placesService.newPlace(formData).then((response) => {
        console.log(response);
        alert('Place added successfully!');
        this.goTo('/');
      });
    }
  }

  goTo(page: string, data: any = '') {
    if (data) {
      this.router.navigate([`/${page}`, { state: JSON.stringify(data) }]);
    } else {
      this.router.navigate([`/${page}`]);
    }
  }

}
