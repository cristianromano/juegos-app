import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreguntasService {
  constructor(private http: HttpClient) {}

  getPreguntas(): Observable<any> {
    return this.http.get('./../../assets/preguntas.json');
  }
}
