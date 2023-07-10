import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })

  }

  onSubmit() {
    this.authService.register(this.registerForm.controls['name'].value, this.registerForm.controls['email'].value, this.registerForm.controls['password'].value)
      .then((res) => {
        console.log(res);

        //this.goTo('home');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  goTo(page: string, data: any = '') {
    if (data) {
      this.router.navigate([`/${page}`, { state: JSON.stringify(data) }]);
    } else {
      this.router.navigate([`/${page}`]);
    }
  }
}
