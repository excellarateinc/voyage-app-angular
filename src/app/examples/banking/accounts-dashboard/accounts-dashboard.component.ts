import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { TransactionHistory } from '../transaction-history.model';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html'
})
export class AccountsDashboardComponent implements OnInit {
  transactionHistory: Array<TransactionHistory>;
  // line Chart
  lineChartData: Array<any> = [];
  lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartOptions: any = { };
  lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(60, 191, 164, 0.2)',
      borderColor: 'rgba(60, 191, 164, 1)'
    },
    {
      backgroundColor: 'rgba(55, 147, 204, 0.2)',
      borderColor: 'rgba(55, 147, 204, 1)'
    }
  ];
  lineChartLegend = true;
  lineChartType = 'line';

  // Doughnut Charts
  doughnutChartLabels: string[] = ['Current Balance', 'Incoming', 'Outgoing'];
  doughnutChartData1: number[] = [3000, 1500, 500];
  doughnutChartData2: number[] = [400, 300, 500];
  doughnutChartType = 'doughnut';
  doughtnutChartColors: Array<any> = [{ backgroundColor: ['#3793cc', '#3cbfa4', '#cccccc'] }];
  doughnutChartOptions: any = {
    maintainAspectRatio: true
  };

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    this.accountsService.getTransactionHistory()
      .subscribe(result => {
        this.transactionHistory = result;
        this.buildLineChart(result);
        this.buildDoughnutCharts(result);
      });
  }

  private buildLineChart(history: Array<TransactionHistory>): void {
    for (const item of history) {
      const lineData: any = { data: [], label: item.accountName };
      for (const transaction of item.transactions) {
        lineData.data.push(transaction.balance);
      }
      this.lineChartData.push(lineData);
    }
  }

  private buildDoughnutCharts(history: Array<TransactionHistory>): void {
  }
}
