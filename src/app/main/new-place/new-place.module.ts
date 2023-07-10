import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPlaceComponent } from './new-place/new-place.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PlacesService } from 'src/app/_services/places.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

  {
    path: '',
    component: NewPlaceComponent,
  }

];


@NgModule({
  declarations: [
    NewPlaceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PlacesService, AuthService, ApiService]
})
export class NewPlaceModule { }
