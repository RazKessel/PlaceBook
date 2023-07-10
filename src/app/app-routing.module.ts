import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { PreventLoggedInGuard } from './_guards/prevent-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(mod => mod.MainModule),
        //canActivate: [AuthGuard]
      },
      {
        path:'auth',
        loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
