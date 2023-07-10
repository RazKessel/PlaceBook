import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() comments!: any[];
  isExpanded = false;

  toggleComments(): void {
    this.isExpanded = !this.isExpanded;
  }
}
