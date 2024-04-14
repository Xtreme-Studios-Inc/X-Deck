import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../types/x-deck-types';
import { env } from '../../environments/env';

@Injectable({
  providedIn: 'root',
})
export class DeckItemService {
  constructor(private http: HttpClient) {}

  getData() {
    const cacheBuster = `cacheBuster=${new Date().getTime()}`;
    const data = this.http.get(`${env.apiUrl}/cms/items?${cacheBuster}`);
    return data;
  }

  exec(path: string): Observable<Item> {
    if (path === '') {
      throw new Error('Path cannot be empty');
    }
    const data = this.http.get(`${env.apiUrl}/exec/` + path);

    return data as Observable<Item>;
  }
}
