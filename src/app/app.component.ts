import { Component, OnInit, HostListener } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
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
  styleUrls: ['./app.component.css', './sidenav.css']
})
export class AppComponent implements OnInit {

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

    $(".logout_btn").click(function () {
      console.log("done");
      $(".logout_confirm").fadeIn();

    })

    $("#no").click(function () {
      $(".logout_confirm").fadeOut();
    })
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    let element = document.getElementById('nav');
    if (window.pageYOffset > 1) {
      element.classList.add('sticky');
    } else {
      element.classList.remove('sticky');
    }
  }






}
