import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Hardcoded logged-in state property (Step 75)
  isLoggedIn: boolean = true;

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}

export { AuthService as Auth };
