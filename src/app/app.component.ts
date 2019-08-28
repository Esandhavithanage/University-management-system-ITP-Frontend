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
    $("#side_nav_container").hover(function () {
      console.log("done");
      $(".nav_text").fadeToggle("Fast", "linear");
      var toggleWidth = $("#side_nav_container").width() == 200 ? "50px" : "200px";
      $('#side_nav_container').animate({ width: toggleWidth });
    });

    $(".logout_btn").click(function () {
      console.log("done");
      $(".logout_confirm").fadeIn();

    })

    $("#no").click(function () {
      $(".logout_confirm").fadeOut();
    })
  }

  
}
