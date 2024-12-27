import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoint } from '../constants/api-route.constants';
import { Observable, tap } from 'rxjs';
import { AdminStore } from './admin.store';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient, private store: AdminStore) {}

  public saveNewMenuItem(formData: any) {
    const accessToken = sessionStorage.getItem('accessToken')!;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      responseType: 'json',
    });

    let options = { headers: headers };

    return this.http.post(endPoint.saveNewMenuItem, formData, options);
  }

  public getMenuCategories(): Observable<any> {
    return this.http.get(endPoint.getMenuCategories).pipe(
      tap((response: any) => {
        this.store.update({ menuCategories: response?.response });
      })
    );
  }

  public getMenu(): Observable<any> {
    return this.http.get(endPoint.getMenu).pipe(
      tap((response: any) => {
        this.store.update({ menu: response?.response });
      })
    );
  }

  public updateMenuItem(formData: any, menuItemId: string) {
    const accessToken = sessionStorage.getItem('accessToken')!;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      responseType: 'json',
    });

    let options = { headers: headers };

    return this.http.post(
      endPoint.updateMenuItem(menuItemId),
      formData,
      options
    );
  }

  public deleteMenuItem(menuItemId: string) {
    return this.http.delete(endPoint.deleteMenuItem(menuItemId));
  }
}
