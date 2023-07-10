import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { UserProfileDropdownComponent } from './user-profile-dropdown/user-profile-dropdown.component';
import { FormsModule } from '@angular/forms';
import { FeedComponent } from './feed/feed/feed.component';
import { ApiService } from '../_services/api.service';
import { PlacesService } from '../_services/places.service';
import { AuthService } from '../_services/auth.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./feed/feed.module').then(mod => mod.FeedModule)
      },
      {
        path: 'new',
        loadChildren: () => import('./new-place/new-place.module').then(mod => mod.NewPlaceModule)
      },
    ]
  }

];



@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    UserProfileDropdownComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [FeedComponent, ApiService, PlacesService, AuthService]
})
export class MainModule { }
