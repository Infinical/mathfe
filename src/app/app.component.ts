import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'ag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ag';
  constructor(public authService:AuthService){
      authService.handleAuthentication();
      authService.scheduleRenewal();
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}