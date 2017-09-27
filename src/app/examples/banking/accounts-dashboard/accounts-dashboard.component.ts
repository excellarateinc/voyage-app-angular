import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import { AccountsService } from '../accounts.service';
import { TransactionHistory } from '../transaction-history.model';
import { Account } from '../account.model';
import { Transaction } from '../transaction.model';
import { TransactionType } from '../transaction-type.enum';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.scss']
})
export class AccountsDashboardComponent implements OnInit {
  transactions: Array<Transaction>;
  accounts: Array<Account>;
  working = false;
  lineChart: any;
  lineChart2: any;

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    this.working = true;
    this.initializeCharts();

    this.accountsService.getAccounts()
      .subscribe(accounts => {
        this.accounts = accounts;
        this.working = false;
        this.buildLineChart();
      });

    this.accountsService.getRecentTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }

  get totalBalance(): number {
    if (!this.accounts) {
      return 0;
    }
    let balance = 0;
    for (let i = 0; i < this.accounts.length; i++){
      balance += this.accounts[i].balance;
    }
    return balance;
  }

  private buildLineChart(): void {
    const lineData: any = { data: [], label: '', lineTension: 0 };
    lineData.data = [1, 2, 4, 5, 4, 6, 3, 7, 8];
    this.lineChart.data.push(lineData);
    this.lineChart2.data.push(lineData);
  }

  private initializeCharts() {
    this.lineChart = {
      data: [],
      labels: ['', '', '', '', '', '', '', '', ''],
      options: { },
      colors: [
        {
          backgroundColor: 'rgba(0, 134, 222, 0.2)',
          borderColor: 'rgba(0, 134, 222, 1)'
        }
      ],
      legend: false,
      type: 'line'
    };

    this.lineChart2 = {
      data: [],
      labels: ['', '', '', '', '', '', '', '', ''],
      options: { },
      colors: [
        {
          backgroundColor: 'rgba(255, 134, 5, 0.2)',
          borderColor: 'rgba(255, 134, 5, 1)'
        }
      ],
      legend: false,
      type: 'line'
    };

    const scales = {
      xAxes: [{
        display: false,
        gridLines: {
          display: false,
          drawBorder: false
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          display: false,
          drawBorder: false
        }
      }]
    };

    this.lineChart.options.scales = scales;
    this.lineChart2.options.scales = scales;
  }
}
