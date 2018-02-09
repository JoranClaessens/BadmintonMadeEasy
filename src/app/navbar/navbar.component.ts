import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bme-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  websiteTitle = 'Badminton Made Easy';
  websiteIcon = 'assets/img/badminton-shuttle-icon1.png';

  constructor() { }

  ngOnInit() {
  }

}
