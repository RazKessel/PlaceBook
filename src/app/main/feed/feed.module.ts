import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';
import { RouterModule, Routes } from '@angular/router';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { CommentsComponent } from './comments/comments.component';
import { ToggleCommentsDirective } from './toggle-comments.directive';
import { CommentComponent } from './comment/comment.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/_services/api.service';
import { PlacesService } from 'src/app/_services/places.service';
import { MapModalComponent } from './map-modal/map-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [

  {
    path: '',
    component: FeedComponent,
  }

];

@NgModule({
  declarations: [
    FeedComponent,
    PostComponent,
    StarRatingComponent,
    CommentsComponent,
    ToggleCommentsDirective,
    CommentComponent,
    MapModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
    
  ],
  providers: [ApiService, PlacesService]
})
export class FeedModule { }
