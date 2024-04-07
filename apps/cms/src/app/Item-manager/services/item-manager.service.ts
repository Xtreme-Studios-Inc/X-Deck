import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ItemManagerService {
  constructor(private http: HttpClient) {}

  getData() {
    const cacheBuster = `cacheBuster=${new Date().getTime()}`;
    const data = this.http.get(
      `http://localhost:4000/cms/items?${cacheBuster}`
    );
    console.log(data);
    return data;
  }
}
