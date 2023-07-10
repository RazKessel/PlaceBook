import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedComponent } from '../feed/feed/feed.component';
import { SearchService } from 'src/app/_services/search.service';
import { AuthService } from 'src/app/_services/auth.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  searchQuery: string = '';

  constructor(private searchService: SearchService, 
    private router: Router, 
    public feedComponent: FeedComponent,
    public authService: AuthService,
    public ls: LocalStorageService){}


  onInputChange(): void {
    this.searchService.setSearchQuery(this.searchQuery);
  }


  goTo(page: string, data: any = '') {
    if (data) {
      this.router.navigate([`/${page}`, {state: JSON.stringify(data)} ]);
    } else {
      this.router.navigate([`/${page}`]);
    }
  }
  

}
