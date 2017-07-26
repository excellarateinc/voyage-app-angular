import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { TransactionHistory } from '../transaction-history.model';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html'
})
export class AccountsDashboardComponent implements OnInit {
  transactionHistory: TransactionHistory;
  // line Chart
  lineChartData: Array<any> = [
    // {data: [900, 1020, 2100, 1900, 3000, 4100, 5000], label: 'HSA Balance'},
    // {data: [150, 480, 730, 1500, 1100, 900, 1200], label: 'FSA Balance'}
  ];
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
  doughnutChartLabels: string[] = ['Available Balance', 'Investment Balance', 'Pending Contributions'];
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
        this.initializeBalanceHistory(result);
      });
  }

  private initializeBalanceHistory(history: TransactionHistory): void {
    const lineData: any = { data: [], label: history.accountName };
    for (const transaction of history.transactions) {
      lineData.data.push(transaction.balance);
    }
    this.lineChartData.push(lineData);
  }

}
