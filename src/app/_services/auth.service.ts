import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import { Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn!: boolean;
  public isLoggedInSub: Subject<boolean>;
  public email: string = "";
  private logInData: any;
  
  
  constructor(private lsService: LocalStorageService,
    private api: ApiService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.isLoggedInSub = new Subject<boolean>();
  }

  public setIsLoggedIn(login: boolean): void {
    this.isLoggedInSub.next(login);
    this.isLoggedIn = login;
  }

  register(name: any, email: any, password: any) {
    this.email = email;
    this.lsService.set("email", email);
    return new Promise<void>((resolve, reject) => {
      this.api.post(`api/users/register`, {'name': `${name}`, 'email': `${email}`, 'password': `${password}` }, {})
        .toPromise()
        .then((res: any) => {
          this.logInData = res;
          console.log(res);
          
          this.router.navigate(['/auth/login']);
        }).catch((err) => {
          reject(err);
        })
    });
  }


  logIn(email: any, password: any) {

    this.email = email;
    this.lsService.set("email", email);
    return new Promise<void>((resolve, reject) => {
      this.api.post(`api/users/login`, { 'email': `${email}`, 'password': `${password}` }, {})
        .toPromise()
        .then((res: any) => {
          this.logInData = res;
          console.log(res);
          this.lsService.set("token", res.token);
  
          // Decode the token and extract the user ID
          const decodedToken: any = jwt_decode(res.token);
          const userId = decodedToken._id;
          this.setIsLoggedIn(true);
          this.isLoggedIn = true;
          this.lsService.set('userId', userId); // Save the user ID with the defined key
          this.lsService.set('login', true)
          this.router.navigate(['/']);
        }).catch((err) => {
          reject(err);
        });
    });
  }
  
  logOut() {
    this.lsService.remove("token");
    this.lsService.remove("userId");
    this.lsService.remove("email");
    this.setIsLoggedIn(false);
    this.isLoggedIn = false;
    this.lsService.set('login', false)
    this.router.navigate(['/']);
  }
  getMe() {
    this.loaderService.noLoading = (false);
    return new Promise<void>((resolve, reject) => {
      this.api.get('api/users/me', { pn: 1, ps: 1 }, {})
        .toPromise()
        .then(
          (res: any) => {
            this.setIsLoggedIn(true)
            this.router.navigate(['/']);
            resolve(res)
          }
        )
        .catch(
          (err: any) => {
            //this.router.navigate(['/login']);
            console.log(err)
            reject(err)
          }
        )
    })

  }


  public async getIsLoggedIn(): Promise<boolean> {


    if (this.isLoggedIn != undefined) {
      return this.isLoggedIn;
    } else {

      await this.getMe()
        .then((res) => {
          this.setIsLoggedIn(true);
          return this.isLoggedIn
        })
        .catch((err) => {
          this.setIsLoggedIn(false);
          return false
        });
    }

    return this.isLoggedIn;

  }

}
