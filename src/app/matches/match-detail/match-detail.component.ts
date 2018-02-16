import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bme-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {
  courtImage = 'assets/img/badminton-court.jpg';

  constructor() { }

  ngOnInit() {
  }

}
