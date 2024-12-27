import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { endPoint } from '../constants/api-route.constants';
import { IUser } from '../models/user';
import { Router } from '@angular/router';
import { AdminStore } from './admin.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userRole = sessionStorage.getItem('role')!;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: AdminStore
  ) {}

  public login(userInfo: IUser): Observable<any> {
    return this.http.post(endPoint.login, userInfo);
  }

  public saveNewUser(userInfo: IUser): Observable<any> {
    return this.http.post(endPoint.signup, userInfo);
  }

  public isAuthenticated(): boolean {
    const accessToken = sessionStorage.getItem('accessToken')!;
    return !!accessToken;
  }

  public logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.store.update({ ordersList: [] });
    this.store.update({ cartItems: [] });
    this.store.update({ currentOrder: [] });
    this.router.navigate(['/']);
  }

  public getSideNavLinks() {
    return this.http.get('../../../../assets/config/sidenav-items.json').pipe(
      filter((response: any) => {
        const navLinks = response
          .filter(
            (x: any) => x.role.toLowerCase() === this.userRole.toLowerCase()
          )
          .map((y: any) => y.links);
        this.store.update({ navLinks: navLinks[0] });
        return response;
      })
    );
  }

  public getAllUsers() {
    return this.http.get(endPoint.getAllUsers).pipe(map((response:any)=>{
      this.store.update({ usersList: response?.response });
      return response
    }));
  }
}
