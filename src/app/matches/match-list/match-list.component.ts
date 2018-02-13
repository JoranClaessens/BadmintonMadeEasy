import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bme-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  isActive = 'active';

  constructor() { }

  ngOnInit() {
  }

  changeStyle($event) {
    this.isActive = $event.type === 'mouseover' ? 'active' : 'none';
  }

}
