import {NgModule} from '@angular/core';
import {
  MatDialogModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule, 
  MatMenuModule, 
  MatToolbarModule, 
  MatExpansionModule, 
  MatGridListModule,
  MatSelectModule,
  MatSidenavModule,
  MatDividerModule,
  MatRadioModule,
  MatCheckboxModule,
  MatStepperModule,
  MatSnackBarModule,
  MatButtonToggleModule,
  MatChipsModule
} from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    MatDividerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatChipsModule
  ],
  exports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    MatDividerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatChipsModule
  ]
})
export class SharedMaterialModule {
}
