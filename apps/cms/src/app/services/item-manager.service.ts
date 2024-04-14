import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../types/x-deck-types';
import { env } from '../../environments/env';

// const BASE_URL = 'http://127.0.0.1:4000/cms';

@Injectable({ providedIn: 'root' })
export class ItemManagerService {
  currentItem: Item | null = null;

  constructor(private http: HttpClient) {}

  getItem(itemId: string) {
    if (itemId === this.currentItem?.name) {
      return of(this.currentItem) as Observable<Item>;
    }

    const data = this.http.get(`${env.apiUrl}/cms/item/${itemId}`);
    return data as Observable<Item>;
  }

  updateItem(item: Item) {
    const data = this.http.put<Item>(`${env.apiUrl}/cms/item/${item.name}`, {
      ...item,
    });
    return data as Observable<Item>;
  }

  createItem(item: Item) {
    const data = this.http.post<Item>(`${env.apiUrl}/cms/new`, {
      ...item,
    });
    return data as Observable<Item>;
  }

  deleteItem(item: Item) {
    const data = this.http.delete<Item>(`${env.apiUrl}/cms/item/${item.name}`);
    return data as Observable<Item>;
  }

  getAllItems() {
    const cacheBuster = `cacheBuster=${new Date().getTime()}`;
    const data = this.http.get(`${env.apiUrl}/cms/items?${cacheBuster}`);
    return data as Observable<Item>;
  }

  getCurrentItem() {
    return this.currentItem;
  }

  setCurrentItem(item: Item) {
    this.currentItem = item;
  }
}
