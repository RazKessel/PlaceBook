import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/_services/places.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { SearchService } from 'src/app/_services/search.service';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  searchQuery: string = '';

  places: any = []; // Initialize places to an empty array
  filteredPlaces: any[] = this.places;
  constructor(private placesService: PlacesService,
    private ls: LocalStorageService,
    private searchService: SearchService,
    private authService: AuthService) {
    this.filteredPlaces = this.places;

  }

  ngOnInit(): void {
    if (this.ls.get('login') == 'true') {
      this.placesService.getAllPlaces()
        .then((res) => {
          this.places = res;
          this.filteredPlaces = this.places;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.placesService.getAllPlacesWithoutAuth()
        .then((res) => {
          this.places = res;
          this.filteredPlaces = this.places;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }


    this.searchService.searchQuery$.subscribe((query) => {
      this.searchQuery = query;
      this.filterPlaces();
    });
  }

  
  handleNewComment(event: any) {
    const { postId, comment } = event;
    const foundPlace = this.filteredPlaces.find((place: any) => place._id === postId);
    if (foundPlace) {
      const comments = {
        "user": this.ls.get('userId'),
        "content": comment,
        "_id": "0000",
        "createdAt": "00000"
      }
      foundPlace.comments.push(comments);
    }
    this.placesService.getAllPlaces()
      .then((res) => {
        this.places = res;
        this.filteredPlaces = this.places;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(foundPlace.comments)
  }

  likePlace(placeId: string) {
    const foundPlace = this.filteredPlaces.find((place: any) => place._id === placeId);
    if (foundPlace) {
      if (!foundPlace.isLiked) {
        foundPlace.isLiked = true;
        foundPlace.likes.push(this.ls.get('userId')); // Add the user ID to the likes array
        foundPlace.likesCount = foundPlace.likes.length; // Update the likes count
      }
    }
  }

  dislikePlace(placeId: string) {
    const foundPlace = this.filteredPlaces.find((place: any) => place._id === placeId);
    if (foundPlace) {
      if (foundPlace.isLiked) {
        foundPlace.isLiked = false;
        const index = foundPlace.likes.indexOf(this.ls.get('userId'));
        if (index !== -1) {
          foundPlace.likes.splice(index, 1); // Remove the user ID from the likes array
        }
        foundPlace.likesCount = foundPlace.likes.length; // Update the likes count
      }
    }
  }

  deletePlace(placeId: string) {
    const index = this.filteredPlaces.findIndex((place: any) => place._id === placeId);
    if (index !== -1) {
      this.filteredPlaces.splice(index, 1);
    }
  }


  filterPlaces(): void {
    const query = this.searchQuery.toLowerCase().trim();

    if (query === '') {
      // If the search query is empty, show all places
      this.filteredPlaces = this.places;
    } else {
      // Filter places based on the search query
      this.filteredPlaces = this.places.filter((place: any) => {
        // Perform the filtering based on the address field
        return place.location.toLowerCase().includes(query);
      });
    }
  }



}
