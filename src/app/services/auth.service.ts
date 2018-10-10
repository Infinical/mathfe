import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as auth0 from 'auth0-js';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  refreshSubscription: any; 
  auth0 = new auth0.WebAuth({
    clientID: 'eVJv6UFM9GVdukBWiURczRCxmb6iaUYG',
    domain: 'pamelalim.auth0.com',
    responseType: 'token id_token',
    audience: 'https://pamelalim.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/home',
    scope: 'openid profile email name picture',
    theme: {
      logo: "http://school.all-gifted.com/pluginfile.php/1/theme_lambda/logo/1472088488/newlogo.png"
    },
    params: {

      }    
  });

  public scheduleRenewal() {
    if(!this.isAuthenticated()) return;
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).flatMap(
      expiresAt => {

       const now = Date.now();

       // Use the delay in a timer to
       // run the refresh at the proper time
       return Observable.timer(Math.max(1, expiresAt - now));
   });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
       this.renewToken();
       this.scheduleRenewal();
     });
  }

  public unscheduleRenewal() {
     if(!this.refreshSubscription) return;
     this.refreshSubscription.unsubscribe();
  }

  constructor(
    public router: Router,
    private jwtHelper: JwtHelperService) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '/member';
        this.setSession(authResult);
        this.router.navigate(['/member']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.scheduleRenewal();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.unscheduleRenewal();
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  
  loggedIn() {
    return this.jwtHelper.isTokenExpired();
  }

  public renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.setSession(result);
      }
    });
  }
}
