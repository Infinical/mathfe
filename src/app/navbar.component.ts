import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
declare var jQuery:any;
declare var $ :any;

@Component({
  selector: 'ag-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService) { }
  
  ngOnInit() {

    $(document).ready(function () {
        mainNav();
    });

    $(window).scroll(function () {
        mainNav();
    });

    $(document).ready(function() {
      $('.main-navigation').onePageNav({
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        filter: ':not(.external)',
        changeHash: true
      });
      
    })

    function mainNav() {
      var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      if (top > 40) $('.sticky-navigation').stop().animate({"top": '0'});

      else $('.sticky-navigation').stop().animate({"top": '-60'});
    }

  }

  public login(){
  	this.authService.login();
  }

  public logout(){
  	this.authService.logout();
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
