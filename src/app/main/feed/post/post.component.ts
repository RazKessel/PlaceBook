import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PlacesService } from 'src/app/_services/places.service';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() post: any;
  @Output() like: EventEmitter<string> = new EventEmitter<string>();
  @Output() dislike: EventEmitter<string> = new EventEmitter<string>();
  @Output() newComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() deletePost: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MapModalComponent) mapModal!: MapModalComponent;

  commentForm!: FormGroup;
  comment = false;

  constructor(private placesService: PlacesService, public authService: AuthService, public ls: LocalStorageService) {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    })
  }


  addComment(postId: any) {
    const comentt = this.commentForm.controls['comment'].value
    this.placesService.comments(postId, this.commentForm.controls['comment'].value)
      .then((res) => {
        this.newComment.emit({ postId, comentt });
        console.log(res);
        this.comment = false;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  onRatingChange(postId: any, rating: number): void {
    this.placesService.rate(postId, rating)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
    console.log('User rating:', rating);
    // Perform any necessary actions with the user rating
  }

  likePlace(placeId: string) {
    this.placesService.like(placeId)
      .then((res) => {
        this.like.emit(placeId);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  dislikePlace(placeId: string) {
    this.placesService.unLike(placeId)
      .then((res) => {
        this.dislike.emit(placeId);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deletePlace(postId: string) {
    this.placesService.deletePlace(postId)
      .then((res: any) => {
        this.deletePost.emit(postId);
        alert("Place deleted successfully");
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      })
    }

    showComment() {
      this.comment = !this.comment;
    }

    openMapModal() {
      this.mapModal.openModal();
    }


    parserDate(date: string) {
      return JSON.parse(date);
    }

    stringDate(date: string) {
      return JSON.stringify(date);
    }


  }
