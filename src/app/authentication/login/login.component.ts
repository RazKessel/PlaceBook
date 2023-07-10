import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;


  constructor(private router: Router, private authService: AuthService){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onSubmit() {
    console.log(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
    
    this.authService.logIn(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
    .then((res) => {
      //this.goTo('home');
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  goTo(page: string, data: any = '') {
    if (data) {
      this.router.navigate([`/${page}`, {state: JSON.stringify(data)} ]);
    } else {
      this.router.navigate([`/${page}`]);
    }
  }
}
