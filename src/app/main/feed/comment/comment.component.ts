import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment!: string;
  @Input() isExpanded!: boolean;

  stringify(obj: any) {
    return JSON.stringify(obj.content);
  }
}
