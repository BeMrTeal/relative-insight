import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API_SERVER = 'http://localhost:3000/reviews';

  private filter$ = new BehaviorSubject<any>({});
  chosenFilter$ = this.filter$.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  setFilter(filter: any) {
    this.filter$.next(filter);
  }

  public getReviews() {
    return this.httpClient.get(this.API_SERVER).pipe(retry(3), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
