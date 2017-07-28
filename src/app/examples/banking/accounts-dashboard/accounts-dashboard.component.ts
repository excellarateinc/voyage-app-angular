import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { TransactionHistory } from '../transaction-history.model';
import { Transaction } from '../transaction.model';
import { TransactionType } from '../transaction-type.enum';

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
  doughnutCharts: any = {
    charts: [],
    labels: ['Deposits', 'Withdrawals'],
    type: 'doughnut',
    colors: [
      { backgroundColor: ['#3793cc', '#3cbfa4'] }
    ],
    options: { maintainAspectRatio: true }
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

  private buildDoughnutCharts(history: Array<TransactionHistory>): any {
    for (let i = 0; i < history.length; i++) {
      const data = this.buildData(history[i]);
      this.doughnutCharts.charts.push({ data: data, title: history[i].accountName });
    }
  }

  private buildData(item: TransactionHistory): Array<number> {
      const deposits = item.transactions.filter((transaction) => {
        return transaction.type === TransactionType.Deposit;
      });

      const withdrawals = item.transactions.filter((transaction) => {
        return transaction.type === TransactionType.Withdrawal;
      });

      let totalDeposits = 0;
      for (let i = 0; i < deposits.length; i++) {
        totalDeposits += deposits[i].amount;
      }

      let totalWithdrawals = 0;
      for (let i = 0; i < withdrawals.length; i++) {
        totalWithdrawals += withdrawals[i].amount;
      }

      return [totalDeposits, totalWithdrawals];
  }
}
