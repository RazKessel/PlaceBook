import { isPlatformBrowser } from '@angular/common';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private isPlatformBrowser: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  set(key: string, value: any) {
    if (this.isPlatformBrowser)
      localStorage.setItem(key, value);
  }

  get(key: string) {
    if (this.isPlatformBrowser)
      return localStorage.getItem(key);
    return null;
  }

  remove(key: string) {
    if (this.isPlatformBrowser)
      localStorage.removeItem(key);
  }
}
