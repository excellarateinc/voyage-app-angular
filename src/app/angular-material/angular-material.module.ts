import { NgModule } from '@angular/core';
import {
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
  MatDialogModule, MatTabsModule
} from '@angular/material';

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
