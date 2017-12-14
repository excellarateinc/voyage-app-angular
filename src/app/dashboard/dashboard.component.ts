import { Component, OnInit } from '@angular/core';

import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  booksByAuthor: any;
  booksByCategory: any;
  topSubscriptions: any;
  constructor(private dashboardService: DashboardService) { }

  async ngOnInit() {
   const booksByAuthorResponse = await this.dashboardService.getBooksByAuthor();
   const booksByCategoryResponse = await this.dashboardService.getBooksByCategory();
   const topSubscriptionsResponse = await  this.dashboardService.getTopSubscriptions();
    this.booksByAuthor = this.processData(booksByAuthorResponse);
    this.booksByCategory = this.processData(booksByCategoryResponse);
    this.topSubscriptions = this.processData(topSubscriptionsResponse);
  }

  private processData(data) {
    const response = JSON.parse(data._body);
    const status = response.status;
    return status !== 'failure' ? response.data : {};
  }
}
