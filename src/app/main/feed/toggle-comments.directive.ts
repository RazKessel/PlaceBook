import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleComments]'
})
export class ToggleCommentsDirective {
  @HostBinding('class.is-expanded') isExpanded = false;

  @HostListener('click') onClick() {
    this.isExpanded = !this.isExpanded;
  }
}
