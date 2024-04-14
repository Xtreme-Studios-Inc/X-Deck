import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../types/x-deck-types';

const BASE_URL = 'http://192.168.3.7:4000/cms';

@Injectable({
  providedIn: 'root',
})
export class DeckItemService {
  constructor(private http: HttpClient) {}

  getData() {
    const cacheBuster = `cacheBuster=${new Date().getTime()}`;
    const data = this.http.get(`${BASE_URL}/items?${cacheBuster}`);
    return data;
  }

  exec(path: string): Observable<Item> {
    if (path === '') {
      throw new Error('Path cannot be empty');
    }
    // console.log(path);
    const data = this.http.get('http://192.168.3.7:4000/exec/' + path);
    // console.log(data);
    return data as Observable<Item>;
  }
}
