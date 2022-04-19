import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Reviews } from '../reviews';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input()
  filterReviews!: string;

  public reviews: any[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getReviews()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.reviews = data;
      });
    this.dataService.chosenFilter$.subscribe((value) => {
      this.filterReviews = value;
    });
  }

  onFilterChange(filter: any) {
    console.log(filter);
    this.dataService.setFilter(filter);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  filterGameReviews(filterTerm: any) {
    if(this.reviews.length === 0 || filterTerm === '') {
      return this.reviews;
    } else {
      return this.reviews.filter(review => {
        return review.score.includes(filterTerm);
      });
    }
  }
}
