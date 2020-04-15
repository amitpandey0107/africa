import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactsuccess.dialog',
  templateUrl: '../../dialogs/contactSuccess/contactsuccess.dialog.html',
  styleUrls: ['../../dialogs/contactSuccess/contactsuccess.dialog.scss'],
})

export class contactSuccessDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<contactSuccessDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
