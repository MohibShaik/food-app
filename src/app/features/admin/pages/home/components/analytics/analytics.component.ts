import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
  public currentDate = new Date();
  public pageTitle = 'Analytics';
}
