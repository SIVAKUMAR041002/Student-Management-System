import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  login(user: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.authTokenKey, JSON.stringify(user));
    }
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.authTokenKey);
    }
  }

  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()) {
      return !!localStorage.getItem(this.authTokenKey);
    }
    return false; // Return false if localStorage is not available
  }

  getUser(): any {
    if (this.isLocalStorageAvailable()) {
      const userJson = localStorage.getItem(this.authTokenKey);
      return userJson ? JSON.parse(userJson) : null;
    }
    return null; // Return null if localStorage is not available
  }
}
