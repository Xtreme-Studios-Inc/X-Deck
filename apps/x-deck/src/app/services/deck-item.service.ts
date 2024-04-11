import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../types/x-deck-types';

@Injectable({
  providedIn: 'root',
})
export class DeckItemService {
  constructor(private http: HttpClient) {}

  getData() {
    const cacheBuster = `cacheBuster=${new Date().getTime()}`;
    const data = this.http.get(`http://192.168.3.7:4000/exec/?${cacheBuster}`);
    // console.log(data);
    return data;
  }

  exec(path: string): Observable<Item> {
    // console.log(path);
    const data = this.http.get('http://192.168.3.7:4000/exec/' + path);
    // console.log(data);
    return data as Observable<Item>;
  }
}
