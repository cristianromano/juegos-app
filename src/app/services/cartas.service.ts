import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartasService {
  constructor(private http: HttpClient) {}

  getCard(): Observable<any> {
    return this.http.get(
      'https://deckofcardsapi.com/api/deck/new/draw/?count=1'
    );
  }
}
