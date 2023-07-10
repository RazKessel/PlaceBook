import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
@Component({
  selector: 'app-user-profile-dropdown',
  templateUrl: './user-profile-dropdown.component.html',
  styleUrls: ['./user-profile-dropdown.component.scss']
})
export class UserProfileDropdownComponent {
  isLoggedIn: boolean = false; // Set this based on the login status
  isOverlayPanelOpen: boolean = false;

  @ViewChild('overlayPanel') overlayPanel!: ElementRef;
  constructor(private router: Router, public authService: AuthService, public ls : LocalStorageService){}

  toggleOverlayPanel(event: Event, ): void {
    event.stopPropagation();
    this.isOverlayPanelOpen = !this.isOverlayPanelOpen;
  }

  connect(): void {
    // Logic for connecting the user
    console.log('Connect');
    this.goTo('auth/login')
    this.isOverlayPanelOpen = false;
  }

  register(): void {
    // Logic for user registration
    this.goTo('auth/register')
    console.log('Register');
    this.isOverlayPanelOpen = false;
  }

  logout(): void {
    // Logic for user logout
    
    console.log('Logout');
    this.isOverlayPanelOpen = false;
    this.authService.logOut();
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any): void {
    const isInsideClick = this.overlayPanel.nativeElement.contains(target);
    if (!isInsideClick) {
      this.isOverlayPanelOpen = false;
    }
  }

  goTo(page: string, data: any = '') {
    if (data) {
      this.router.navigate([`/${page}`, {state: JSON.stringify(data)} ]);
    } else {
      this.router.navigate([`/${page}`]);
    }
  }
}
