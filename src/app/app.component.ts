import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Reviews } from './reviews';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Game Reviews';
  selected = '';

  public reviews: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.chosenFilter$.subscribe((value) => {
      this.selected = value;
    });
    this.dataService.setFilter(this.selected);
  }
}
