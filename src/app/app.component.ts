import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public static log: boolean = false;
  public static admin: boolean = false;
  public static emp: boolean = false;
  public static nonemp: boolean = false;
  public static student: boolean = false;

  constructor(private slimLoadingBarService: SlimLoadingBarService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.slimLoadingBarService.start();
    }
    if (event instanceof NavigationEnd) {
      this.slimLoadingBarService.complete();
    }
    if (event instanceof NavigationCancel) {
      this.slimLoadingBarService.stop();
    }
    if (event instanceof NavigationError) {
      this.slimLoadingBarService.stop();
    }
  }

  ngOnInit() {
    if(localStorage.getItem('currentUser') == null){

    }else{
      
    }
    
  }


  logout(){
    console.log("logout");
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
    
  }






}
