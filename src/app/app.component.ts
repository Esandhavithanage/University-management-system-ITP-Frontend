import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './sidenav.css']
})
export class AppComponent implements OnInit{

  constructor() {}

  ngOnInit(){

    $(".logout_btn").click(function () {
      console.log("done");
      $(".logout_confirm").fadeIn();

    })

    $("#no").click(function () {
      $(".logout_confirm").fadeOut();
    })
  }


   
  
  
}
