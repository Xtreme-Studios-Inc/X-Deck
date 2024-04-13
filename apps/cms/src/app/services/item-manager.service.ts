import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../types/x-deck-types';

const BASE_URL = 'http://127.0.0.1:4000/cms';

@Injectable({ providedIn: 'root' })
export class ItemManagerService {
  currentItem: Item | null = null;

  constructor(private http: HttpClient) {}

  getItem(itemId: string) {
    if (itemId === this.currentItem?.name) {
      return of(this.currentItem) as Observable<Item>;
    }

    const data = this.http.get(`${BASE_URL}/item/${itemId}`);
    return data as Observable<Item>;
  }

  updateItem(item: Item) {
    const data = this.http.put<Item>(`${BASE_URL}/item/${item.name}`, {
      ...item,
    });
    return data as Observable<Item>;
  }

  getAllItems() {
    // const cacheBuster = `cacheBuster=${new Date().getTime()}`;
    const data = this.http.get(`${BASE_URL}/items`);
    // const data = this.http.get(`/cms/items?${cacheBuster}`);
    // console.log(data);
    return data as Observable<Item>;
  }

  getCurrentItem() {
    console.log('current item', this.currentItem);
    return this.currentItem;
  }

  setCurrentItem(item: Item) {
    console.log('setting item', item);
    this.currentItem = item;
  }
}