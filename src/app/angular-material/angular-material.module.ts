import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule
  ]
})
export class AngularMaterialModule { }
