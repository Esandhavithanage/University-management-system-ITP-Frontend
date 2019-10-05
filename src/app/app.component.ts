import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './sidenav.css']
})
export class AppComponent implements OnInit{
  salaryCollapsed: boolean = false;
  resourceCollapsed: boolean = false;
  studentCollapsed: boolean = false;
  employeeCollapsed: boolean = false;
  eventCollapsed: boolean = false;
  newsCollapsed: boolean = false;
  examCollapsed: boolean = false;
  bookCollapsed: boolean = false;

  constructor() {}

  ngOnInit(){
 
  $("#UpdateScroll").click(function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    console.log("scrolling");
    return false;
  })

    $(".logout_btn").click(function () {
      console.log("done");
      $(".logout_confirm").fadeIn();

    })

    $("#no").click(function () {
      $(".logout_confirm").fadeOut();
    })

    
  }

  
}
