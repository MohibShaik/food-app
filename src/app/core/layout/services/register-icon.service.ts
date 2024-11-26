import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonUrl = 'assets/config/menu.json';
  constructor(private http: HttpClient) {}

  getMenu(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
