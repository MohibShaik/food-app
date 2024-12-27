import { Component, OnInit } from '@angular/core';
import { AdminQuery } from 'src/app/features/admin/state/admin.query';
import { AuthService } from 'src/app/features/admin/state/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  public currentDate = new Date();
  public pageTitle = 'Customers';

  constructor(private authService: AuthService , public query : AdminQuery) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers() {
    this.authService.getAllUsers().subscribe();
  }
}
