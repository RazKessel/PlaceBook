import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    private lsService: LocalStorageService,
    private api: ApiService,
    private router: Router
  ) { }


  newPlace(data: FormData) {
    return new Promise<void>((resolve, reject) => {
      const headers = new HttpHeaders(); // Create a new HttpHeaders object
      headers.append('Content-Type', 'multipart/form-data'); // Set the Content-Type header


      this.api.post(`api/places`, data, { headers: headers })
        .toPromise()
        .then((res: any) => {
          resolve(res)
        }).catch((err) => {
          reject(err);
        })
    });
  }

  deletePlace(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.api.delete(`api/places/${id}`, {}, { })
        .toPromise()
        .then((res: any) => {
          
          resolve(res)
        }).catch((err) => {
          reject(err);
        })
    });
  }



  comments(id: any, content: any) {
    return new Promise<void>((resolve, reject) => {
      this.api.post(`api/places/${id}/comments`, { 'content': `${content}` }, {})
        .toPromise()
        .then((res: any) => {
          resolve(res)
        }).catch((err) => {
          reject(err);
        })
    });
  }

  rate(id: any, rating: any) {
    return new Promise<void>((resolve, reject) => {
      this.api.post(`api/places/${id}/ratings`, { 'rating': `${rating}` }, {})
        .toPromise()
        .then((res: any) => {
          resolve(res)
        }).catch((err) => {
          reject(err);
        })
    });
  }


  getAllPlaces() {
    return new Promise<void>((resolve, reject) => {
      this.api.get('api/places', {}, {})
        .toPromise()
        .then((res: any) => {
          resolve(res)
        }).catch((err: any) => {
          reject(err)
        })
    })
  }

  getAllPlacesWithoutAuth() {
    return new Promise<void>((resolve, reject) => {
      this.api.get('api/places/all', {}, {})
        .toPromise()
        .then((res: any) => {
          resolve(res)
        }).catch((err: any) => {
          reject(err)
        })
    })
  }

  like(postId: any) {
    return new Promise<void>((resolve, reject) => {
      this.api.post(`api/places/${postId}/like`, {}, {}, {})
        .toPromise()
        .then((res: any) => {
          resolve(res)
        }).catch((err) => {
          reject(err);
        })
    });
  }

  unLike(postId: any) {
    return new Promise<void>((resolve, reject) => {
      this.api.post(`api/places/${postId}/unlike`, {}, {}, {})
        .toPromise()
        .then((res: any) => {
          resolve(res)
        }).catch((err) => {
          reject(err);
        })
    });
  }

}
