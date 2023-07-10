import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() averageRating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  selectedStarIndex: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  ngOnInit() {
    this.selectedStarIndex = Math.round(this.averageRating);
  }

  fillStars(index: number): void {
    this.selectedStarIndex = index;
  }

  resetStars(): void {
    this.selectedStarIndex = Math.round(this.averageRating);
  }

  rate(rating: number): void {
    this.ratingChange.emit(rating);
    this.averageRating = rating;
  }
}
