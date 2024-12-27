import { Component, OnInit } from '@angular/core';
import { AdminQuery } from 'src/app/features/admin/state/admin.query';
import { AuthService } from 'src/app/features/admin/state/auth.service';

@Component({
  selector: 'app-custom-layout',
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss'],
})
export class CustomLayoutComponent implements OnInit {
  public userRole = sessionStorage.getItem('role')!;
  constructor(private authService: AuthService, public query: AdminQuery) {}
  get isAdmin(): boolean {
    return this.userRole.toLowerCase() === 'admin';
  }
  ngOnInit(): void {
    this.getSideNavLinks();
  }

  public onLogoutClick() {
    this.authService.logout();
  }

  private getSideNavLinks() {
    this.authService.getSideNavLinks().subscribe();
  }
}
